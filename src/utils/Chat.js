export default async function chatGPTApi(promptMessage) {
  const url = 'https://gpt-4o.p.rapidapi.com/chat/completions';
  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': '942ee7640amsh1f6c64f19f0009bp1611bajsne74055fdf1ad',
      'x-rapidapi-host': 'gpt-4o.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: promptMessage 
        }
      ],
      web_access: false
    })
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result) // for debugging purposes
    return JSON.parse(result);
  } catch (error) {
    console.error(error);
  }
}


