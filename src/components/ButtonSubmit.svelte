<script>
  import { isValidInput } from "./store.js"

  import { getAnswer} from "../services/ia.js"
  import Loading from "./icons/Loading.svelte"
  let promise = null

  const handleClick = async () => {
    const text = document.getElementById("result").value
    promise = getAnswer(text)
    const value = await promise

    document.getElementById("result").value = value
    promise = null
  }
</script>

{#if promise === null}

  <button 
  on:click={handleClick}
  disabled={!$isValidInput}
  type="button" 
  class={`py-2 px-4 
  bg-slate-800 hover:bg-slate-600
   text-white w-full transition ease-in 
    duration-200 text-center text-base 
    font-semibold shadow-md focus:outline-none
    focus:ring-2 focus:ring-offset-2  rounded-lg ${
      !$isValidInput  ? "pointer-events-none opacity-30" : ""
    }`}
    >
    Get Idea
  </button>


{:else}
  {#await promise}
    <button
      type="button"
      class="pointer-events-none py-2 px-4 flex justify-center items-center  bg-neutral-400 hover:bg-neutral-400 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
    >
      <Loading />
      Loading...
    </button>
  {/await}
{/if}

{#if $isValidInput}
  <strong class="text-slate-900" 
    >You are not using English or the text is too short!</strong
  >
{/if}