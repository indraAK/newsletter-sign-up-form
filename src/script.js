const app = document.querySelector("#app"),
  subscribeForm = document.querySelector("form[name=subscribe]"),
  emailInput = document.querySelector("input[name=email]");

subscribeForm.addEventListener("submit", handleSubmit);

emailInput.addEventListener("input", () => {
  if (isValidEmail(emailInput.value) === false) {
    showFieldError({ name: email.name, message: "Valid email required" });
  } else {
    clearFieldError(email.name);
  }
});

async function handleSubmit(evt) {
  evt.preventDefault();
  const { email, subscribeBtn } = subscribeForm;

  if (isValidEmail(email.value) === false) {
    showFieldError({ name: email.name, message: "Valid email required" });
    return;
  }

  clearFieldError(email.name);
  subscribeBtn.disabled = true;
  subscribeBtn.textContent = "Subscribing...";
  await new Promise((resolve) => setTimeout(resolve, 2000));
  document.querySelector("#subscribe-form-container").remove();
  displayEmailConfirmation(email.value);
}

function isValidEmail(email) {
  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return emailRegex.test(email);
}

function showFieldError({ name, message }) {
  const formControl = subscribeForm[name];
  formControl.style.borderColor = "#ef4444";

  if (!document.body.contains(document.querySelector(`[data-error-name=${name}]`))) {
    const errorElement = document.createElement("span");
    errorElement.className = "error";
    errorElement.setAttribute("data-error-name", name);
    errorElement.textContent = message;
    formControl.insertAdjacentElement("afterend", errorElement);
  }
}

function clearFieldError(fieldName) {
  const formControl = subscribeForm[fieldName];
  const errorElement = document.querySelector(`[data-error-name=${fieldName}]`);
  formControl.removeAttribute("style");
  errorElement?.remove();
}

function displayEmailConfirmation(email) {
  const element = document.createElement("div");
  element.className = "fixed inset-0 w-full h-full lg:relative";
  element.setAttribute("id", "confirmation-dialog");
  element.innerHTML = `
    <div class="bg-white h-full flex flex-col p-6 pt-10 max-w-md mx-auto rounded-3xl lg:p-10">
      <img src="./assets/images/icon-success.svg" alt="Icon Success" class="w-12" />
      <h2 class="text-slate-900 text-4xl font-bold mt-6 lg:text-3xl">Thanks for subscribing!</h2>
      <p class="text-slate-700 mt-4 flex-1">
        A confirmation email has been sent to <span class="text-slate-900 font-bold">${email}</span>. Please open it and click the
        button inside to confirm your subscription.
      </p>
      <button class="btn-primary lg:mt-8" onclick="closeDialog()">Dismiss message</button>
    </div>
  `;

  app.appendChild(element);
}

function displaySubscribeForm() {
  const element = document.createElement("div");
  element.setAttribute("id", "subscribe-form-container");
  element.className =
    "bg-white max-w-md mx-auto pb-6 lg:max-w-3xl lg:flex lg:flex-row-reverse lg:items-center lg:gap-4 lg:pb-4 lg:p-4 lg:rounded-2xl";
  element.innerHTML = `
    <div>
      <picture class="block w-full">
        <source srcset="/assets/images/illustration-sign-up-desktop.svg" media="(min-width: 1024px)" />
        <source srcset="/assets/images/illustration-sign-up-mobile.svg" media="(max-width: 1024px)" />
        <img src="/assets/images/illustration-sign-up-mobile.svg" alt="Illustration Sign-up" class="w-full" />
      </picture>
    </div>
    <div class="pt-8 px-4 lg:pt-0 lg:px-7">
      <h1 class="text-3xl text-slate-900 font-bold lg:text-4xl">Stay updated!</h1>
      <p class="text-slate-700 mt-4">Join 60,000+ product managers receiving monthly updates on:</p>
      <ul role="list" class="benefit-list">
        <li>
          <p>Product discovery and building what matters</p>
        </li>
        <li>
          <p>Measuring to ensure updates are a success</p>
        </li>
        <li>
          <p>And much more!</p>
        </li>
      </ul>
      <form class="mt-8" id="subscribe-form">
        <fieldset class="space-y-2">
          <label for="email" class="inline-block text-slate-800 text-sm">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email@company.com"
            class="inline-flex w-full h-11 px-3 py-2 border border-slate-300 rounded-md text-base text-slate-700 placeholder:text-sm focus:outline-none focus:border-slate-700"
          />
        </fieldset>
        <button class="btn-primary" type="submit">Subscribe</button>
      </form>
    </div>
  `;

  app.appendChild(element);
}

function closeDialog() {
  document.querySelector("#confirmation-dialog").remove();
  displaySubscribeForm();
}
