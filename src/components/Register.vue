<script>
let Query = new URLSearchParams(window.location.search);
import ColorThemeBox from "./ColorThemeBox.vue";
import SidebarNavs from "./SidebarNavs.vue";
import HeaderSearchbox from "./HeaderSearchbox.vue";

export default {
  name: "DashboardComponent",
  components: {
    SidebarNavs,
    ColorThemeBox,
    HeaderSearchbox,
  },
  data() {
    return {
      errorDisplay(error) {
        this.errorMessage = error;
      },
      register() {
        fetch(`${window.$BackendURL}/api/v1/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              username: document.getElementById("username").value,
              password: document.getElementById("password").value,
            },
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.Success) {
              if (data.Data) {
                if (data.Data.token) {
                  localStorage.setItem("token", data.Data.token);
                  setTimeout(() => {
                    window.location.reload();
                  }, 250);
                } else {
                  localStorage.removeItem("token");
                }
              }
            } else {
              this.errorDisplay(data.DisplayMessage);
            }
          });
      },

      errorMessage: null,
      color: localStorage.color,
    };
  },
  created() {},
};
</script>
<template>
  <div class="w-full">
    <div
      class="fixed inset-0 flex z-40 md:hidden"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="fixed inset-0 bg-bray-500 bg-opacity-75"
        aria-hidden="true"
      ></div>

      <div
        class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-bray-500"
      >
        <div class="absolute top-0 right-0 -mr-12 pt-2">
          <button
            type="button"
            class="ml-1 flex items-center justify-center h-10 w-10 rounded-full"
          >
            <span class="sr-only">Close sidebar</span>

            <svg
              class="h-6 w-6 text-white"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="flex-shrink-0 w-14" aria-hidden="true"></div>
    </div>

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
      <div class="min-h-full flex flex-col justify-center sm:px-6 lg:px-8">
        <div class="mt-8 sm:mx-auto mt-16 sm:w-full sm:max-w-md">
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
            class="bg-bray-500 mt-5 border-bray-300 border py-8 px-4 shadow sm:rounded-lg sm:px-10"
          >
            <div class="space-y-6" action="#" method="POST">
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-400"
                >
                  Username
                </label>
                <div class="mt-1">
                  <input
                    id="username"
                    type="username"
                    autocomplete="username"
                    required
                    placeholder="John Doe"
                    class="appearance-none block w-full bg-bray-500 px-3 py-2 border text-gray-300 border-bray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-400"
                >
                  Password
                </label>
                <div class="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="**********"
                    autocomplete="current-password"
                    required
                    class="appearance-none block w-full bg-bray-500 px-3 py-2 border text-gray-300 border-bray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  @click="register()"
                  :class="`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-${color} focus:outline-none`"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
