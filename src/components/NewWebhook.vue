<script>
import ToggleButton from "./ToggleButton.vue";
import SidebarNavs from "./SidebarNavs.vue";
import ColorThemeBox from "./ColorThemeBox.vue";
import HeaderSearchbox from "./HeaderSearchbox.vue";
export default {
  name: "DashboardComponent",
  components: {
    SidebarNavs,
    ColorThemeBox,
    HeaderSearchbox,
    ToggleButton,
  },
  data() {
    return {
      errorMessage: null,
      createWebhook() {
        fetch(`${window.$BackendURL}/api/v1/webhooks/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: localStorage.token,
            data: {
              log_uses: localStorage.new_webhook_log_use,
              url: localStorage.new_webhook_url,
              name: localStorage.new_webhook_name,
              description: localStorage.new_webhook_description,
            },
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.Success == true) {
              window.location.href = `/manage-api?id=${res.Data.id}`;
            } else {
              if (res.DisplayMessage) {
                this.errorMessage = res.DisplayMessage;
              }
            }
          });
      },
      toggleNewWebhookLogUses() {
        if (
          localStorage.new_webhook_log_uses == true ||
          localStorage.new_webhook_log_uses == "true"
        ) {
          localStorage.setItem("new_webhook_log_uses", false);
        } else {
          localStorage.setItem("new_webhook_log_uses", true);
        }
      },
      script: {},
      localStorage: localStorage,
      new_script_private: localStorage.new_script_private,
      color: localStorage.color,
    };
  },
  methods: {},
  async created() {
    if (!localStorage.new_script_private)
      localStorage.new_script_private = false;
  },
};
</script>
<template>
  <div class="w-full">
    <div
      class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border border-bray-300"
    >
      <div class="flex-1 flex flex-col min-h-0 bg-bray-500">
        <div class="flex items-center h-16 flex-shrink-0 px-4 bg-bray-500">
          <h1 class="text-2xl font-bold text-gray-300">
            <span :class="`text-${color}`" class="">Blox</span><span>Safe</span>
          </h1>
        </div>
        <div class="flex-1 flex flex-col overflow-y-auto">
          <nav class="flex-1 px-3 py-4 space-y-1">
            <SidebarNavs />
          </nav>
          <ColorThemeBox />
        </div>
      </div>
    </div>
    <div class="md:pl-64 flex flex-col">
      <div
        class="sticky top-0 z-10 border-bray-300 border-b flex-shrink-0 flex h-16 bg-bray-500"
      >
        <button
          type="button"
          class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        >
          <span class="sr-only">Open sidebar</span>

          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
        <div class="flex-1 px-5 flex justify-between">
          <div class="flex-1 flex">
            <HeaderSearchbox />
          </div>
        </div>
      </div>
      <div class="px-4 py-4">
        <div class="bg-bray-500 shadow sm:rounded-lg">
          <div
            v-if="errorMessage"
            class="p-4 flex space-x-2 text-gray-300 text-sm border-bray-300 border rounded-md"
          >
            <h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                :class="`h-5 w-5 text-${color}`"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
                />
              </svg>
            </h1>
            <h1>{{ errorMessage }}</h1>
          </div>
        </div>
        <div
          class="mt-3 grid text-gray-300 items-center flex w-full grid-cols-2"
        >
          <div>Log Uses</div>
          <div class="w-full float-right">
            <ToggleButton
              tip="Everytime your script is run a webhook is sent"
              :toggled="localStorage.new_webhook_log_uses"
              :onClick="toggleNewWebhookLogUses"
            />
          </div>
        </div>
        <input
          placeholder="Enter Webhook Name"
          v-model="localStorage.new_webhook_name"
          :class="`scrollbar-thin py-3 scrollbar-thumb-${color} mt-3 scrollbar-track-bray-400 overflow-y-scroll rounded text-gray-300 text-sm bg-bray-500 border border-bray-300 resize-none w-full focus:outline-none px-3`"
        />
        <input
          placeholder="Enter Webhook Description"
          v-model="localStorage.new_webhook_description"
          :class="`scrollbar-thin py-3 scrollbar-thumb-${color} scrollbar-track-bray-400 mt-3 overflow-y-scroll rounded text-gray-300 text-sm bg-bray-500 border border-bray-300 resize-none w-full focus:outline-none px-3`"
        />
        <input
          placeholder="Enter Webhook URL"
          v-model="localStorage.new_webhook_url"
          :class="`scrollbar-thin py-3 scrollbar-thumb-${color} scrollbar-track-bray-400 mt-3 overflow-y-scroll rounded text-gray-300 text-sm bg-bray-500 border border-bray-300 resize-none w-full focus:outline-none px-3`"
        />
        <div class="grid-cols-1 grid mt-3">
          <h1 class="text-gray-200 font-bold text-3xl">
            <span>{{ script.name }}</span>
          </h1>
          <button
            @click="createWebhook()"
            :class="`bg-${color} float-right text-white rounded-md px-9 py-3`"
          >
            Create Key
          </button>
        </div>
      </div>
      <!-- Content -->
    </div>
  </div>
</template>
