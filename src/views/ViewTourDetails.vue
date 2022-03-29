<template>
  <tour-container v-if="!isLoading">
    <div class="relative">
      <a
        class="absolute top-[15px] left-[15px] z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white"
        @click="$router.go(-1)"
      >
        <svg
          class="mr-1"
          width="12"
          height="20"
          viewBox="0 0 12 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11 1L2 10L11 19" stroke="#242323" stroke-width="2" />
        </svg>
      </a>
      <tour-slider-images :images="tour.images"> </tour-slider-images>
    </div>

    <div class="mt-[15px] px-[15px]">
      <tour-region :region-id="tour.regionId"></tour-region>
      <tour-title> {{ tour.title }} </tour-title>
      <tour-creator :creator="tour.creator"></tour-creator>
      <tour-types :types="tour.types"></tour-types>

      <hr class="mt-[15px] border-[#f0f0f0]" />
    </div>

    <tour-main-places :main-places="tour.mainPlaces"></tour-main-places>

    <div class="my-[15px] px-[15px]">
      <hr class="mb-[15px] border-[#f0f0f0]" />

      <tour-summary>
        <template #video>
          <tour-video v-if="tour.links" :links="tour.links"></tour-video>
        </template>

        <template #advantages>
          {{ tour.advantages }}
        </template>
      </tour-summary>

      <hr class="mt-[15px] border-[#f0f0f0]" />
    </div>

    <div v-if="['roadbook', 'guide'].includes(tour.type)" class="px-[15px]">
      <tour-sheet-button
        v-for="(button, index) in availableSheets"
        :key="index"
        class="mb-[10px] last:mb-0"
        @click="open(button.name)"
      >
        <template #icon>
          <component :is="button.icon"></component>
        </template>

        {{ button.title }}
      </tour-sheet-button>
    </div>

    <div v-if="tour.type === 'source'" class="px-[15px]">
      <tour-sheet-button tag="a" :href="tour.sourceLink" target="_blank">
        <template #icon>
          <svg-icon-link></svg-icon-link>
        </template>

        Source
      </tour-sheet-button>
    </div>

    <app-bottom-sheet
      ref="myBottomSheet"
      is-full-screen
      :title="sheet.title"
      :overflow="sheet.overflow"
      :max-height="sheet.maxHeight"
    >
      <component :is="sheet.component" v-bind="sheet.props"></component>
    </app-bottom-sheet>

    <tour-bottom-bar></tour-bottom-bar>
  </tour-container>

  <div
    v-else
    class="mx-auto flex min-h-screen w-full max-w-screen-sm items-center justify-center bg-white"
  >
    <app-spinner></app-spinner>
  </div>
</template>

<script setup>
import { ref, inject, shallowRef, computed } from "vue";
import { useRoute } from "vue-router";

import { TourService } from "../services";

import AppSpinner from "../components/AppSpinner.vue";
import AppBottomSheet from "../components/AppBottomSheet.vue";
import TourVideo from "../components/tour/TourVideo.vue";
import SvgIconFaq from "../components/svg/SvgIconFaq.vue";
import SvgIconLink from "../components/svg/SvgIconLink.vue";
import SvgIconBudget from "../components/svg/SvgIconBudget.vue";
import SvgIconItinerary from "../components/svg/SvgIconItinerary.vue";
import SvgIconApartments from "../components/svg/SvgIconApartments.vue";

import {
  TourFaq,
  TourTypes,
  TourTitle,
  TourBudget,
  TourRegion,
  TourSummary,
  TourCreator,
  TourPaywall,
  TourProgram,
  TourContainer,
  TourBottomBar,
  TourApartments,
  TourMainPlaces,
  TourSheetButton,
  TourSliderImages,
} from "../components/tour";

const route = useRoute();
const notification = inject("$notification");

const tour = ref({});
const isLoading = ref(false);
const myBottomSheet = ref(null);
const sheet = ref("");
const isPreview = ref(route.meta.isPreview);

const sheetList = [
  {
    name: "program",
    title: "Itinerary",
    icon: SvgIconItinerary,
    component: shallowRef(TourProgram),
    propKey: "program",
    types: ["roadbook"],
    overflow: true,
    maxHeight: "98%",
  },
  {
    name: "guide",
    title: "Guide",
    icon: SvgIconItinerary,
    component: shallowRef(TourProgram),
    propKey: "program",
    types: ["guide"],
    overflow: true,
    maxHeight: "98%",
  },
  {
    name: "apartments",
    title: "Where to stay",
    icon: SvgIconApartments,
    component: shallowRef(TourApartments),
    propKey: "apartments",
    types: ["roadbook", "guide"],
    overflow: true,
    maxHeight: "98%",
  },
  {
    name: "faq",
    title: "Recs & hacks",
    icon: SvgIconFaq,
    component: shallowRef(TourFaq),
    propKey: "faq",
    types: ["roadbook", "guide"],
    overflow: true,
    maxHeight: "98%",
  },
  {
    name: "budget",
    title: "Budget",
    icon: SvgIconBudget,
    component: shallowRef(TourBudget),
    propKey: "budget",
    types: ["roadbook"],
    overflow: true,
    maxHeight: "98%",
  },
];

const sheetPaywall = {
  component: shallowRef(TourPaywall),
  overflow: false,
  maxHeight: "440px",
};

const availableSheets = computed(() => {
  return sheetList.filter((sheet) => sheet.types.includes(tour.value.type));
});

function checkPayment() {
  const payed = !tour.value.price > 0;
  return payed;
}

function open(sheetName) {
  const payed = checkPayment();

  if (!payed && !isPreview.value) {
    sheet.value = sheetPaywall;
    sheet.value.props = {
      tourPrice: tour.value.price,
      tourPriceCurrId: tour.value.priceCurrId,
      creatorFirstName: tour.value.creator.firstName,
    };
    myBottomSheet.value.open();
    return;
  }

  sheet.value = sheetList.find((sheet) => sheet.name === sheetName);

  switch (sheet.value.name) {
    case "budget":
      sheet.value.props = {
        budget: tour.value.budget,
        countNights: tour.value.program.length,
        whatIncluded: tour.value.whatIncluded,
      };
      break;
    case "program":
      sheet.value.props = {
        program: tour.value.program,
        mainImage: tour.value.images[0],
        tourType: tour.value.type,
      };
      break;
    case "guide":
      sheet.value.props = {
        program: tour.value.program,
        mainImage: tour.value.images[0],
        tourType: tour.value.type,
      };
      break;

    default:
      sheet.value.props = {
        [sheet.value.propKey]: tour.value[sheet.value.propKey],
      };
      break;
  }

  myBottomSheet.value.open();
}

async function getTour() {
  try {
    isLoading.value = true;
    tour.value = await TourService.getTour(route.params.id);
  } catch (error) {
    let title = "Something went wrong while loading the tour";

    if (error.code === 404) {
      title = "Tour not found";
    }

    notification({ type: "error", title });
  } finally {
    isLoading.value = false;
  }
}

getTour();
</script>

<script>
export default {
  name: "ViewTourDetails",
};
</script>
