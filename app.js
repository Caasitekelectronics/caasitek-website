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
    box.innerHTML = "<p>Unable to load products right now.</p>";
    return;
  }
  if (!data || data.length === 0) {
    box.innerHTML = "<p>No products available at the moment.</p>";
    return;
  }
  box.innerHTML = data.map(product => {
    const price = Number(product.price || 0).toLocaleString();
    const meta = [
      product.storage,
      product.condition
    ].filter(Boolean).join(" • ");
    const warranty = product.warranty
      ? `<span class="product-warranty">✓ ${product.warranty} warranty</span>`
      : `<span class="product-warranty">✓ Warranty available</span>`;
    const image = product.image
  ? `<img src="${product.image}" alt="${product.name}" loading="lazy">`
  : `<div class="product-placeholder">
      <img
        src="https://njvagupehnpmzjxjebfy.supabase.co/storage/v1/object/public/product-images/site-logo.png"
        alt="CAASITEK Electronics"
      >
    </div>`;
    const featuredBadge = product.featured
      ? `<span class="product-badge">FEATURED</span>`
      : "";
    const stock = Number(product.stock || 0);
    const stockText = stock > 0
      ? `<span class="stock available">● In Stock</span>`
      : `<span class="stock unavailable">● Out of Stock</span>`;
    const description = product.description
      ? `<p class="product-description">${product.description}</p>`
      : "";
    const whatsappMessage = encodeURIComponent(
      "Hello CAASITEK, I am interested in the " +
      product.name +
      "."
    );
    return `
      <article class="product-card">
        <div class="product-image">
          ${featuredBadge}
          ${image}
        </div>
        <div class="product-content">
          <div class="product-category">
            ${product.category || "CAASITEK Electronics"}
          </div>
          <h3>${product.name}</h3>
          <div class="product-price">
            K${price}
          </div>
          ${meta
            ? `<div class="product-meta">${meta}</div>`
            : ""
          }
          ${warranty}
          ${stockText}
          ${description}
          <a
            class="product-whatsapp"
            href="https://wa.me/260979459033?text=${whatsappMessage}"
          >
            Order on WhatsApp
          </a>
        </div>
      </article>
    `;
  }).join("");
}
loadProducts();
