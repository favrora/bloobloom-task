<template>
  <div class="content">

    <div class="filter-row row">
      <div class="filter-box col-0 col-md-4"></div>

      <div class="filter-box title-box col-12 col-sm-6 col-md-4">
        <h1>{{ mainTitle }}</h1>
      </div>

      <div class="filter-box col-12 col-sm-6 col-md-4">
        <div class="filters-menu">
          <div @click="isColourFilters = !isColourFilters"
              :class="{ active: isColourFilters }">
              Colour
          </div>
          <div @click="isShapeFilters = !isShapeFilters"
              :class="{ active: isShapeFilters }"
            >
            Shape
          </div>
        </div>
      </div>
    </div>

    <div class="filter-items row" :class="{ active: isColourFilters }">
      <div class="col">
        <span class="colour-hover">
          <span class="colour-preview" style="background:#000"></span>
        </span>
        Black
      </div>

      <div class="col">
        <span class="colour-hover">
          <span class="colour-preview tortoise"></span>
        </span>
        Tortoise
      </div>

      <div class="col">
        <span class="colour-hover">
          <span class="colour-preview coloured"></span>
        </span>
        Coloured
      </div>

      <div class="col">
        <span class="colour-hover">
          <span class="colour-preview" style="background:#ebecf1"></span>
        </span>
        Crystal
      </div>

      <div class="col">
        <span class="colour-hover">
          <span class="colour-preview" style="background:#622932"></span>
        </span>
        Dark
      </div>

      <div class="col">
        <span class=colour-hover>
          <span class="colour-preview" style="background:#d68c36"></span>
        </span>
        Bright
      </div>
    </div>


    <div class="filter-items shape row" :class="{ active: isShapeFilters }">
      <div class="col">
        Square
      </div>

      <div class="col">
        Rectangle
      </div>

      <div class="col">
        Round
      </div>

      <div class="col">
        Cat-Eye
      </div>

    </div>

    <!-- <div class="item col-12 col-sm-6 col-md-4">A</div> -->

    <div id="collectionBox" class="collection-items"></div>

  </div>
</template>

<script>
let collectionURL = 'https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections',
  dataURL = "https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections/";

  // https://api.bloobloom.com/user/v1/sales_channels/website/collections/spectacles-men/glasses?sort[type]=collection_relations_position&sort[order]=asc&filters[lens_variant_prescriptions][]=fashion&filters[lens_variant_types][]=classic&page[limit]=12&page[number]=1&filters[glass_variant_frame_variant_colour_tag_configuration_names][]=coloured&filters[glass_variant_frame_variant_frame_tag_configuration_names][]=round&filters[frame_variant_home_trial_available]=false

export default {
  name: "Content",
  data() {
    return {
      mainTitle: "Spectacles Women",
      isColourFilters: false,
      isShapeFilters: false
    };
  },
  created: function() {
    this.getCollection();
  },
  methods: {
    getCollection: function() {
      fetch(collectionURL)
        .then(response => {
          response.json().then(json => {
            this.setCollection(json.collections);
          });
        })
    },
    setCollection: function(data) {
      const currentURL = window.location.pathname.split("/"),
        currentCollection = currentURL[currentURL.length - 1];

      // Выбираем коллекцию на основе url адреса страницы
      for (let i = 0; i < data.length; i++) {
        if (currentCollection === data[i].configuration_name) {
          this.mainTitle = data[i].name;
          dataURL = `${dataURL}${data[i].configuration_name}/glasses${window.location.search}`;
          this.getItem();
        }
      }
    },

    getItem: function() {
      fetch(dataURL)
        .then(response => {
          response.json().then(json => {
            this.showItem(json.glasses);
          });
        })
    },

    showItem: function(json) {
      let collectionBox = document.getElementById("collectionBox");
      collectionBox.innerHTML = "";

      console.log(dataURL);
      console.log(json);

      for (let i = 0; i < json.length; i++) {
        let itemName = json[i].name,
          itemImage = json[i].glass_variants[0].media[0].url,

          itemTemplate = `
            <div class="item col-12 col-sm-6 col-md-4">
              <span class="title">${itemName}</span>
              <img src="${itemImage}" alt=">${itemName}">
            </div>`;

        collectionBox.innerHTML += itemTemplate;
      }


    }

  }
};
</script>
