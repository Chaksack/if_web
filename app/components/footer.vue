<template>
  <footer class="w-full">
    <div class="border-t bg-gray-50">
      <div class="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <h3 class="mb-4 text-[12px] font-semibold uppercase tracking-wide text-gray-700">Personal Banking</h3>
          <ul class="space-y-2 text-[13px] text-gray-600">
            <li><NuxtLink to="/loans/personal" class="hover:text-gray-900">Personal Loans</NuxtLink></li>
            <li><NuxtLink to="/loans/home" class="hover:text-gray-900">Home Loans</NuxtLink></li>
            <li><NuxtLink to="/loans/auto" class="hover:text-gray-900">Auto Loans</NuxtLink></li>
            <li><NuxtLink to="/loans/education" class="hover:text-gray-900">Education Loans</NuxtLink></li>
            <li><NuxtLink to="/credit-cards" class="hover:text-gray-900">Credit Cards</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h3 class="mb-4 text-[12px] font-semibold uppercase tracking-wide text-gray-700">Business Banking</h3>
          <ul class="space-y-2 text-[13px] text-gray-600">
            <li><NuxtLink to="/loans/business" class="hover:text-gray-900">Business Loans</NuxtLink></li>
            <li><NuxtLink to="/loans/equipment" class="hover:text-gray-900">Equipment Financing</NuxtLink></li>
            <li><a href="#" class="hover:text-gray-900">Business Accounts</a></li>
            <li><a href="#" class="hover:text-gray-900">Merchant Services</a></li>
            <li><a href="#" class="hover:text-gray-900">Business Banking</a></li>
          </ul>
        </div>
        <div>
          <h3 class="mb-4 text-[12px] font-semibold uppercase tracking-wide text-gray-700">Support</h3>
          <ul class="space-y-2 text-[13px] text-gray-600">
            <li><NuxtLink to="/help-support" class="hover:text-gray-900">Help & Support</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-gray-900">Contact Us</NuxtLink></li>
            <li><NuxtLink to="/careers" class="hover:text-gray-900">Careers</NuxtLink></li>
            <li><a href="#" class="hover:text-gray-900">Branch Locator</a></li>
            <li><a href="#" class="hover:text-gray-900">FAQs</a></li>
          </ul>
        </div>
        <div>
          <h3 class="mb-4 text-[12px] font-semibold uppercase tracking-wide text-gray-700">Resources</h3>
          <ul class="space-y-2 text-[13px] text-gray-600">
            <li><NuxtLink to="/news" class="hover:text-gray-900">News & Updates</NuxtLink></li>
            <li><NuxtLink to="/features" class="hover:text-gray-900">Features</NuxtLink></li>
            <li><a href="#" class="hover:text-gray-900">Financial Tips</a></li>
            <li><a href="#" class="hover:text-gray-900">Blog</a></li>
            <li><a href="#" class="hover:text-gray-900">Media Center</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="bg-gray-900 text-gray-300">
      <div class="mx-auto max-w-7xl px-6 py-12">
        <div class="flex items-center gap-2">
          <span class="h-2.5 w-2.5 rounded-full bg-red-500"></span>
          <span class="text-[15px] font-semibold tracking-tight text-gray-100">Innovative Finance</span>
        </div>
        <div class="mt-6 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h4 class="text-[12px] font-semibold uppercase tracking-wide text-gray-200">Banking with Us</h4>
            <ul class="mt-3 space-y-2 text-[13px]">
              <li><a class="hover:text-white" href="#">Internet Banking</a></li>
              <li><a class="hover:text-white" href="#">Mobile Banking</a></li>
              <li><a class="hover:text-white" href="#">Rates and Charges</a></li>
              <li><a class="hover:text-white" href="#">Glossary</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-[12px] font-semibold uppercase tracking-wide text-gray-200">Customer Service</h4>
            <ul class="mt-3 space-y-2 text-[13px]">
              <li><NuxtLink class="hover:text-white" to="/help-support">Help & Support</NuxtLink></li>
              <li><NuxtLink class="hover:text-white" to="/contact">Contact Us</NuxtLink></li>
              <li><NuxtLink class="hover:text-white" to="/careers">Careers</NuxtLink></li>
              <li><a class="hover:text-white" href="#">Branch Locations</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-[12px] font-semibold uppercase tracking-wide text-gray-200">Socials</h4>
            <ul class="mt-3 space-y-2 text-[13px]">
              <li><a class="hover:text-white" href="#">Twitter</a></li>
              <li><a class="hover:text-white" href="#">Instagram</a></li>
              <li><a class="hover:text-white" href="#">Facebook</a></li>
              <li><a class="hover:text-white" href="#">Youtube</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-[12px] font-semibold uppercase tracking-wide text-gray-200">Legal</h4>
            <ul class="mt-3 space-y-2 text-[13px]">
              <li><NuxtLink class="hover:text-white" to="/privacy-policy">Privacy Policy</NuxtLink></li>
              <li><NuxtLink class="hover:text-white" to="/terms-conditions">Terms & Conditions</NuxtLink></li>
              <li><NuxtLink class="hover:text-white" to="/help-support">Help & Support</NuxtLink></li>
            </ul>
          </div>
        </div>
        <div class="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gray-800 pt-6 text-[11px] text-gray-400">
          <div class="space-x-2">
            <NuxtLink to="/credit-cards" class="hover:text-gray-300">Credit Cards</NuxtLink>·
            <NuxtLink to="/careers" class="hover:text-gray-300">Careers</NuxtLink>·
            <NuxtLink to="/contact" class="hover:text-gray-300">Contact</NuxtLink>·
            <NuxtLink to="/help-support" class="hover:text-gray-300">Help & Support</NuxtLink>·
            <NuxtLink to="/privacy-policy" class="hover:text-gray-300">Privacy</NuxtLink>·
            <NuxtLink to="/terms-conditions" class="hover:text-gray-300">Terms</NuxtLink>
          </div>
          <span>Innovative Finance © 2025 · All Rights Reserved</span>
        </div>
      </div>
    </div>
  </footer>

</template>
<script setup>
</script>