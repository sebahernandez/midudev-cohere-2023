<script>
  import { isValidInput } from "./store.js"
  import { checkIsLenguaje } from "../services/ia.js"

  const handleChange = async (e) => {
    const { value } = e.target
    const isValid = value.length > 0
    if (!isValid) {
      isValidInput.set(false)
      return
    }

    const isValue = await checkIsLenguaje(value)
    isValidInput.set(isValue)
  }
</script>

<textarea
  on:input={handleChange}
  id="result"
  class="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
  placeholder="Enter two ingredients, Example: Flour and milk"
  name="comment"
  rows="10"
  cols="40"
/>