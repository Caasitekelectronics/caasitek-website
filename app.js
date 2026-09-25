import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL =
  "https://njvagupehnpmzjxjebfy.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_My7phM94P5foLkK565nkXw_Pj8DlShZ";

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const box = document.querySelector("#products");

async function loadProducts() {

  if (!box) return;

  box.innerHTML = "<p>Loading products...</p>";

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("featured", { ascending: false })
    .order("name", { ascending: true });

  if (error) {

    console.error("Supabase error:", error);

    box.innerHTML =
      "<p>Unable to load products right now.</p>";

    return;
  }

  if (!data || data.length === 0) {

    box.innerHTML =
      "<p>No products available at the moment.</p>";

    return;
  }

  box.innerHTML = data.map(product => {

    const price = Number(product.price || 0)
      .toLocaleString();

    const meta = [
      product.storage,
      product.condition,
      product.warranty
        ? "Warranty: " + product.warranty
        : null
    ]
      .filter(Boolean)
      .join(" • ");

    const image = product.image
      ? `<img src="${product.image}" alt="${product.name}">`
      : "";

    const description = product.description
      ? `<p>${product.description}</p>`
      : "";

    return `
      <article class="product">

        <div class="product-img">
          ${image}
        </div>

        <div class="product-body">

          <h3>${product.name}</h3>

          <div class="price">
            K${price}
          </div>

          <div class="meta">
            ${meta || "Warranty available"}
          </div>

          ${description}

          <a
            class="wa"
            href="https://wa.me/260979459033?text=${encodeURIComponent(
              "Hello CAASITEK, I am interested in the " +
              product.name
            )}"
          >
            Order on WhatsApp
          </a>

        </div>

      </article>
    `;

  }).join("");
}

loadProducts();
