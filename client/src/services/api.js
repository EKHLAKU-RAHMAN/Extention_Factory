export const generateExtension = async (prompt) => {

  try {

    const response = await fetch("http://localhost:5000/api/extension/generate", {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify({ prompt }),

    });



    if (!response.ok) {

      throw new Error("Failed to generate extension");

    }



    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);



    const a = document.createElement("a");

    a.href = url;

    a.download = "extension.zip";

    document.body.appendChild(a);

    a.click();

    a.remove();

  } catch (error) {

    console.error(error);

    alert("Error generating extension");

  }

};