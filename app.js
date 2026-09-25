const products=[
{name:'iPhone 13',price:'K9,999',meta:'Warranty available • Multiple storage options'},
{name:'iPhone 15',price:'K12,999',meta:'Warranty available • Multiple storage options'},
{name:'iPhone 15 Pro',price:'K14,500',meta:'Warranty available • Multiple storage options'},
{name:'iPhone 17 Pro Max',price:'K30,000',meta:'Warranty available • Multiple storage options'}
];
const box=document.querySelector('#products');
box.innerHTML=products.map(p=>`<article class="product"><div class="product-img"></div><div class="product-body"><h3>${p.name}</h3><div class="price">${p.price}</div><div class="meta">${p.meta}</div><a class="wa" href="https://wa.me/260979459033?text=${encodeURIComponent('Hello CAASITEK, I am interested in the '+p.name)}">Order on WhatsApp</a></div></article>`).join('');
