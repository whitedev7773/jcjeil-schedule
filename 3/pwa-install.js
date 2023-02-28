window.onload = () => {
  'use strict';
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }
}

window.addEventListener('beforeinstallprompt', (event) => {
  console.log('👍', 'beforeinstallprompt', event);
  // 나중에 이벤트를 활성화하려고 보관한다.
  window.deferredPrompt = event;
  // 설치 버튼에 담긴 hidden 클래스를 제거한다. 
  installButton.classList.toggle('hidden', false);
});

installButton.addEventListener('click', async () => {
  console.log('👍', 'butInstall-clicked');
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available.
    return;
  }
  // 설치 prompt 호출!
  promptEvent.prompt();
  // 결과물 로깅 및 사용자 선택 저장
  const result = await promptEvent.userChoice;
  console.log('👍', 'userChoice', result);
  // 이벤트 초기화. prompt()는 한번만 호출할 수 있다.
  window.deferredPrompt = null;
  // 설치 버튼 다시 숨기기
  installButton.classList.toggle('hidden', true);

});

window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event);
  // 이벤트 초기화 (리소스 가비지 처리) 
  window.deferredPrompt = null;
});