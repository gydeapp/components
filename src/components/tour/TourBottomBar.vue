<template>
  <div
    class="fixed bottom-0 mx-auto flex h-[72px] w-full max-w-screen-sm items-center justify-between border-t border-[#DADADA] bg-white px-[15px]"
  >
    <div></div>

    <div class="flex">
      <button
        type="button"
        disabled
        class="flex h-10 w-[120px] items-center justify-center rounded-full bg-black text-sm font-semibold text-white disabled:opacity-40 focus-visible:outline-none"
      >
        Interested
      </button>

      <button
        type="button"
        disabled
        class="ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F0F0] text-sm font-semibold text-white disabled:opacity-40 focus-visible:outline-none"
      >
        <svg
          width="16"
          height="20"
          viewBox="0 0 16 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.39029 13.0535L1 17.9691V4C1 2.34315 2.34315 1 4 1H12C13.6569 1 15 2.34315 15 4V17.9691L8.60971 13.0535L8 12.5845L7.39029 13.0535Z"
            stroke="#242323"
            stroke-width="2"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TourBottomBar",
};
</script>
