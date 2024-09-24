const loadData = async (isTrue) => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  const aiList = data.data.tools;
  console.log(aiList);
  ShowData(aiList, isTrue);
};

const ShowData = (aiList, isTrue = true) => {
  const aiItemElements = document.getElementById("ai-item-container");
  const showButton = document.getElementById("show-more");
  aiItemElements.innerHTML = ""; // Clear the previous list items
  if (aiList.length > 6 && isTrue) {
    aiList = aiList.slice(0, 6); // Limit the list to 6 items
    showButton.classList.remove("hidden");
  } else {
    showButton.classList.add("hidden");
  }
  aiList.forEach((ai) => {
    const div = document.createElement("div");
    div.classList = "card bg-base-100 w-[330px] shadow-xl";
    div.innerHTML = `          <figure class="px-5 pt-8">
                <img
                  src=${ai.image}
                  alt="Not Found"
                  class="rounded-xl"
                />
              </figure>
              <div class="card-body">
                <h2 class="card-title">Features</h2>
                <ol class="list-decimal mb-2">
                  ${ai.features
                    .map((feature) => `<li>${feature}</li>`)
                    .join("")}
                </ol>
                <hr />
                <h2 class="card-title">${ai.name}</h2>
                <div class="card-actions justify-between">
                  <div>
                    <i class="fa-regular fa-calendar-days"></i> <span id="post-date">${
                      ai.published_in
                    }</span>
                  </div>
                  <button onclick="aiDetails('${
                    ai.id
                  }')" class="btn bg-orange-200 rounded-full"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
              </div>`;
    aiItemElements.appendChild(div);
  });
};
const aiDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  const data = await res.json();
  const ai = data.data;
  console.log(ai);
  showAiDetails(ai);
  my_modal_ai.showModal();
};

const showAiDetails = (ai) => {
  const textDetails = document.getElementById("text-details");
  const imageGreetings = document.getElementById('image-greeting')
  textDetails.innerHTML = `
                  <h3 class="font-bold">${ai.description}</h3>
              <div class="flex gap-5 mt-5">
                ${ai.pricing ? ai.pricing
                  .map((price) => {
                    return `<div class="bg-orange-50 rounded-lg p-5">
                          <span class="text-sm">${price.price}</span>
                          <span class="text-base font-bold">${price.plan}</span>
                        </div>`;
                  })
                  .join("") : ''}
                </div>
              </div>
              <div class="flex justify-between mt-4">
                <div>
                  <h2 class="text-xl font-bold">Features</h2>
                  <ul class="list-disc">
                    <li>${ai.features['1'].feature_name}</li>
                    <li>${ai.features['2'].feature_name}</li>
                    <li>${ai.features['3'].feature_name}</li>

                  </ul>
                </div>
                <div>
                  <h2 class="text-xl font-bold">Integration</h2>
                  <ul class="list-disc">
                    ${ai.integrations? ai.integrations.map((value) => { 
                       return `<li>${value}</li>`;
                    } ).join('') : ''
                    }
                  </ul>
                </div>
              </div>
    `;
    imageGreetings.innerHTML = `
    <figure class="rounded-lg my-4">
                <img
                  src= ${ai.image_link[1] ||  ai.image_link[0] }
                  alt="Not Found"
                  class="rounded-xl"
                />
              </figure>
              <h2 class="text-xl font-bold text-center">${ai.input_output_examples ? ai.input_output_examples[0].input : ''}</h2>
              <p class="text-center">${ai.input_output_examples ? ai.input_output_examples[0].output : ''}</p>
    `
};
const showButton = () => {
  let isTrue = false;
  loadData(isTrue);
};
loadData();
