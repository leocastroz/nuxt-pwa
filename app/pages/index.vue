<template>
    <div>
       <div>
            <h1>PWA Push Notification testando</h1>
            
            <div v-if="!notificationSupported" style="color: red; margin: 10px 0;">
              ❌ Seu navegador não suporta notificações push
            </div>
            
            <div v-else style="margin: 10px 0;">
              <p>Status da permissão: <strong>{{ permissionStatus }}</strong></p>
              <div v-if="permissionStatus === 'denied'" style="color: orange;">
                ⚠️ Permissão negada. Habilite nas configurações do navegador:
                <br>• Chrome: Configurações → Privacidade e segurança → Configurações do site → Notificações
                <br>• Firefox: Preferências → Privacidade e segurança → Permissões → Notificações
              </div>
            </div>
            
            <button @click="subscribeUser" :disabled="!notificationSupported">
              Ativar Push
            </button>
            <button @click="sendTest" :disabled="!notificationSupported">
              Enviar Notificação
            </button>
        </div>
    </div>

</template>


<script setup lang="ts">
import { useRuntimeConfig } from 'nuxt/app';
import { onMounted, ref } from 'vue';

const notificationSupported = ref(false);
const permissionStatus = ref('');

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

const subscribeUser = async () => {
  if (!("Notification" in window) || !("serviceWorker" in navigator)) {
    alert("Navegador não suporta notificações.");
    return;
  }

  // Verificar se já temos permissão
  if (Notification.permission === "granted") {
    console.log("✅ Permissão já concedida");
  } else if (Notification.permission === "denied") {
    alert("Permissão para notificações foi negada. Por favor, habilite nas configurações do navegador.");
    return;
  } else {
    // Solicitar permissão
    const permission = await Notification.requestPermission();
    permissionStatus.value = permission;
    if (permission !== "granted") {
      alert("Permissão negada! Habilite as notificações nas configurações do navegador e tente novamente.");
      return;
    }
  }

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: urlBase64ToUint8Array(
    String(useRuntimeConfig().public.VAPID_PUBLIC_KEY)
  )
});

  console.log("📡 Subscription:", subscription);

  await $fetch("/api/save-subscription", {
    method: "POST",
    body: subscription
  });

  alert("Dispositivo inscrito para notificações!");
};

const sendTest = async () => {
  await $fetch("/api/send-push", {
    method: "POST",
    body: { title: "Hello!", body: "Notificação de teste via PWA 🎉" }
  });
};


const checkNotificationSupport = () => {
  if ("Notification" in window && "serviceWorker" in navigator) {
    notificationSupported.value = true;
    permissionStatus.value = Notification.permission;
    console.log("🔔 Status da permissão:", Notification.permission);
  } else {
    notificationSupported.value = false;
    console.log("❌ Notificações não suportadas");
  }
};

onMounted(() => {
  console.log('App component mounted');
  checkNotificationSupport();
  
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
      .then(() => console.log("✅ Service Worker registrado"))
      .catch(err => console.error("Erro ao registrar SW:", err));
  }
});
</script>