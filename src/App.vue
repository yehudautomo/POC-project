<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'
import { App } from '@capacitor/app'

let data = {version: ""}
CapacitorUpdater.notifyAppReady()
App.addListener('appStateChange', async(state) => {
  if (state.isActive) {
    // Do the download during user active app time to prevent failed download
    data = await CapacitorUpdater.download({
      version: '0.0.4',
      url: 'https://github.com/Cap-go/demo-app/releases/download/0.0.4/dist.zip',
    })
  }
  if (!state.isActive && data.version !== "") {
    // Do the switch when user leave app
    await SplashScreen.show()
    try {
      await CapacitorUpdater.set(data)
    } catch (err) {
      console.log(err)
      await SplashScreen.hide() // in case the set fail, otherwise the new app will have to hide it
    }
  }
})

export default defineComponent({
  name: 'App'
})
</script>
