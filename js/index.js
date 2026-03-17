document.addEventListener('DOMContentLoaded', async () => {
  const statusText = document.getElementById('statusText');

  try {
    statusText.textContent = 'LINEログインを確認しています...';

    const profile = await initLiff();

    if (!profile) {
      statusText.textContent = 'LINEログイン画面へ移動します...';
      return;
    }

    const lineUserId = profile.userId;
    const displayName = profile.displayName || '';

    statusText.textContent = '会員情報を確認しています...';

    const result = await getMemberByLineId(lineUserId);

    if (!result.ok) {
      console.error(result);
      statusText.textContent = '会員確認に失敗しました。時間をおいて再度お試しください。';
      return;
    }

    if (result.exists && result.member) {
      statusText.textContent = '会員証画面へ移動します...';

      // 会員証画面へ遷移
      window.location.href = 'member.html';
      return;
    }

    statusText.textContent = '初回登録画面へ移動します...';

    // 未登録なら register.html へ
    const params = new URLSearchParams({
      lineUserId: lineUserId,
      displayName: displayName
    });

    window.location.href = `register.html?${params.toString()}`;

  } catch (error) {
    console.error(error);
    statusText.textContent = 'エラーが発生しました。';
  }
});