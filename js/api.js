async function postToGas(action, payload) {
  try {
    const response = await fetch(APP_CONFIG.GAS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify({
        action,
        payload
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    return {
      ok: false,
      error: error.toString()
    };
  }
}

async function registerMember(payload) {
  return await postToGas('registerMember', payload);
}

async function getMemberByLineId(lineUserId) {
  return await postToGas('getMemberByLineId', { lineUserId });
}

async function addVisit(payload) {
  return await postToGas('addVisit', payload);
}