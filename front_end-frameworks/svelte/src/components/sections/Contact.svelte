<script>
  import { UserRound, Mail, MessageSquare, FolderKanban, Users, Sparkles, ArrowRight } from '@lucide/svelte'
  import Button from '../ui/Button.svelte'
  import SectionBadge from '../ui/SectionBadge.svelte'
  import SectionTitle from '../ui/SectionTitle.svelte'

  /** @param {number} ms */
  function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  let formData = $state({ fullName: "", email: "", message: "" })
  let isSending = $state(false)
  let feedbackMessage = $state("Please fill all required fields.")

  /** @param {SubmitEvent} event */
  async function handleSubmit(event) {
    event.preventDefault()
    isSending = true
    feedbackMessage = "Sending message..."
    await delay(1500)
    feedbackMessage = "Your message has been sent successfully."
    formData = { fullName: "", email: "", message: "" }
    isSending = false
    await delay(3000)
    feedbackMessage = "Please fill all required fields."
  }

  let isFullNameValid = $derived(formData.fullName.trim().length >= 2)
  let isEmailValid = $derived(formData.email.includes('@') && formData.email.includes('.'))
  let isMessageValid = $derived(formData.message.trim().length >= 10)
  let isFormValid = $derived(isFullNameValid && isEmailValid && isMessageValid)
</script>

<section id="contact-section" class="relative bg-slate-950 py-24">
  <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.3),transparent_50%)]"></div>
  <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30"></div>
  <div class="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
    <SectionBadge text="Start your AI journey" />
    <SectionTitle line1="Ready to Explore" line2="Agentic AI?" />
    <div class="flex gap-4 mb-8">
      <Button href="#" text="Enroll at Holberton School" icon={ArrowRight} target="_blank" rel="noopener noreferrer" />
      <Button href="#" text="Need more information?" variant="secondary" target="_blank" rel="noopener noreferrer" />
    </div>
    <div class="mb-8 flex gap-6 flex-wrap justify-center">
      <div class="text-violet-500 inline-flex items-center gap-2">
        <FolderKanban />
        <span class="text-sm text-slate-300">Project-based learning</span>
      </div>
      <div class="text-violet-500 inline-flex items-center gap-2">
        <Users />
        <span class="text-sm text-slate-300">Peer learning environment</span>
      </div>
      <div class="text-violet-500 inline-flex items-center gap-2">
        <Sparkles />
        <span class="text-sm text-slate-300">AI-powered workflows</span>
      </div>
    </div>
    <form autocomplete="off" onsubmit={handleSubmit} class="w-full max-w-md p-8 rounded-2xl border border-slate-800 bg-slate-900 mt-8">
      <div class="mb-6 w-full">
        <label for="fullName" class="flex items-center gap-2 text-sm text-slate-300 mb-2">
          <UserRound class="text-violet-500" size={16} />
          <span>Full name</span>
        </label>
        <input
          placeholder="Your full name..."
          id="fullName"
          name="fullName"
          bind:value={formData.fullName}
          class="w-full px-4 py-2 rounded-md border border-slate-800 placeholder:text-slate-500 {isFullNameValid ? 'focus:border-violet-500' : 'focus:border-red-500'} bg-black text-slate-50 focus:outline-none"
        />
      </div>
      <div class="mb-6 w-full">
        <label for="email" class="flex items-center gap-2 text-sm text-slate-300 mb-2">
          <Mail class="text-violet-500" size={16} />
          <span>Email</span>
        </label>
        <input
          placeholder="you@example..."
          id="email"
          name="email"
          type="email"
          bind:value={formData.email}
          class="w-full px-4 py-2 rounded-md border border-slate-800 placeholder:text-slate-500 {isEmailValid ? 'focus:border-violet-500' : 'focus:border-red-500'} bg-black text-slate-50 focus:outline-none"
        />
      </div>
      <div class="mb-6 w-full">
        <label for="message" class="flex items-center gap-2 text-sm text-slate-300 mb-2">
          <MessageSquare class="text-violet-500" size={16} />
          <span>Message</span>
        </label>
        <textarea
          placeholder="Tell us about your project or learning goals!"
          id="message"
          name="message"
          rows="4"
          bind:value={formData.message}
          class="placeholder:text-slate-500 w-full px-4 py-2 rounded-md border border-slate-800 bg-black {isMessageValid ? 'focus:border-violet-500' : 'focus:border-red-500'} text-slate-50 focus:outline-none"
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={!isFormValid || isSending}
        class="w-full mt-4 px-4 py-2 font-semibold rounded-md bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white"
      >
        {isSending ? "Sending..." : "Send message"}
      </button>
      <p class="text-sm text-slate-400 mt-4">{feedbackMessage}</p>
    </form>
  </div>
</section>
