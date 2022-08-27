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
      <div class="col" @click="addColourFilter('black')" data-color="black">
        <span class="colour-hover">
          <span class="colour-preview" style="background:#000"></span>
        </span>
        Black
      </div>

      <div class="col" @click="addColourFilter('tortoise')" data-color="tortoise">
        <span class="colour-hover">
          <span class="colour-preview tortoise"></span>
        </span>
        Tortoise
      </div>

      <div class="col" @click="addColourFilter('coloured')" data-color="coloured">
        <span class="colour-hover">
          <span class="colour-preview coloured"></span>
        </span>
        Coloured
      </div>

      <div class="col" @click="addColourFilter('crystal')" data-color="crystal">
        <span class="colour-hover">
          <span class="colour-preview" style="background:#ebecf1"></span>
        </span>
        Crystal
      </div>

      <div class="col" @click="addColourFilter('dark')" data-color="dark">
        <span class="colour-hover">
          <span class="colour-preview" style="background:#622932"></span>
        </span>
        Dark
      </div>

      <div class="col" @click="addColourFilter('bright')" data-color="bright">
        <span class=colour-hover>
          <span class="colour-preview" style="background:#d68c36"></span>
        </span>
        Bright
      </div>
    </div>


    <div class="filter-items shape row" :class="{ active: isShapeFilters }">
      <div class="col" @click="addShapeFilter('square')" data-shape="square">
        Square
      </div>

      <div class="col" @click="addShapeFilter('rectangle')" data-shape="rectangle">
        Rectangle
      </div>

      <div class="col" @click="addShapeFilter('round')" data-shape="round">
        Round
      </div>

      <div class="col" @click="addShapeFilter('cat-Eye')" data-shape="cat-Eye">
        Cat-Eye
      </div>
    </div>

    <!-- Items -->
    <div id="collectionBox" class="collection-items"></div>

    <!-- Loader -->
    <div class="loader-box" :class="{ 'd-none': hideLoader }">
      <div class="loader"></div>
    </div>

    <!-- No results-->
    <div class="no-results pt-4 text-center" :class="{ 'd-none': noResults }">
      No results, please change your filters
    </div>

  </div>
</template>

<script>
let collectionURL = 'https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections',
  apiURL = "https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections/",
  dataURL = "";

  // https://api.bloobloom.com/user/v1/sales_channels/website/collections/spectacles-men/glasses?sort[type]=collection_relations_position&sort[order]=asc&filters[lens_variant_prescriptions][]=fashion&filters[lens_variant_types][]=classic&page[limit]=12&page[number]=1&filters[glass_variant_frame_variant_colour_tag_configuration_names][]=coloured&filters[glass_variant_frame_variant_frame_tag_configuration_names][]=round&filters[frame_variant_home_trial_available]=false

export default {
  name: "Content",
  data() {
    return {
      mainTitle: "Spectacles Women",
      isColourFilters: false,
      isShapeFilters: false,
      hideLoader: true,
      noResults: true
    };
  },
  created: function() {
    sessionStorage.clear();
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
      let currentURL = window.location.pathname.split("/"),
        currentCollection = currentURL[currentURL.length - 1],
        colourParams = new URLSearchParams(window.location.search).get('colour'),
        shapeParams = new URLSearchParams(window.location.search).get('shape'),
        convertedParams = "?sort[type]=collection_relations_position&sort[order]=asc&filters[lens_variant_prescriptions][]=fashion&filters[lens_variant_types][]=classic&filters[frame_variant_home_trial_available]=false&page[limit]=12";


      convertedParams += "&page[number]=1";

      // Если есть фильтры по цвету, то конвертируем и добавляем
      if (colourParams) {
        let param = colourParams.split("~");
        sessionStorage.setItem("colour", colourParams);

        for (let i = 1; i < param.length; i++) {
          convertedParams += `&filters[glass_variant_frame_variant_colour_tag_configuration_names][]=${param[i]}`;
          document.querySelector(`[data-color=${param[i]}]`).classList.add("active");
        }
      }

      if (shapeParams) {
        let param = shapeParams.split("~");
        sessionStorage.setItem("shape", shapeParams);

        for (let i = 1; i < param.length; i++) {
          convertedParams += `&filters[glass_variant_frame_variant_frame_tag_configuration_names][]=${param[i]}`;
          document.querySelector(`[data-shape=${param[i]}]`).classList.add("active");
        }
      }

      /* console.log(convertedParams); */

      // Show loader
      this.noResults = true;
      this.hideLoader = false;

      // Выбираем коллекцию на основе url адреса страницы
      for (let i = 0; i < data.length; i++) {
        if (currentCollection === data[i].configuration_name) {
          this.mainTitle = data[i].name;
          dataURL = `${apiURL}${data[i].configuration_name}/glasses${convertedParams}`;
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

      console.log(json);

      // Hide loader
      this.hideLoader = true;

      // Show no results text
      if (json.length == 0) {
        this.noResults = false;
      } else {
        this.noResults = true;
      }

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
    },

    addColourFilter: function(colour) {
      let queryArr = this.$route.query,
        checkColourSession = sessionStorage.getItem("colour"),
        colourValue = "", newParams = "";

      if (sessionStorage.getItem("colour")) {
        colourValue = sessionStorage.getItem("colour");
      }

      // Если этот цвет уже есть в фильтре, то удаляем его после второго клика
      // иначе добавляем цвет в фильтр и в url
      if (checkColourSession && checkColourSession.includes(colour)) {
        let removedFilter = colourValue.replaceAll(`~${colour}`, '');
        newParams = { ...queryArr, 'colour': `${removedFilter}` };
        sessionStorage.setItem("colour", `${removedFilter}`);
        document.querySelector(`[data-color="${colour}"]`).classList.remove("active");
      } else {
        newParams = { ...queryArr, 'colour': `${colourValue}~${colour}` };
        sessionStorage.setItem("colour", `${colourValue}~${colour}`);
      }

      this.$router.push({ query: newParams }).catch(err => {});
      this.getCollection();
    },

    addShapeFilter: function(shape) {
      let queryArr = this.$route.query,
        checkShapeSession = sessionStorage.getItem("shape"),
        shapeValue = "", newParams = "";

      if (sessionStorage.getItem("shape")) {
        shapeValue = sessionStorage.getItem("shape");
      }

      // Если этот цвет уже есть в фильтре, то удаляем его после второго клика
      // иначе добавляем цвет в фильтр и в url
      if (checkShapeSession && checkShapeSession.includes(shape)) {
        let removedFilter = shapeValue.replaceAll(`~${shape}`, '');
        newParams = { ...queryArr, 'shape': `${removedFilter}` };
        sessionStorage.setItem("shape", `${removedFilter}`);
        document.querySelector(`[data-shape="${shape}"]`).classList.remove("active");
      } else {
        newParams = { ...queryArr, 'shape': `${shapeValue}~${shape}` };
        sessionStorage.setItem("shape", `${shapeValue}~${shape}`);
      }

      this.$router.push({ query: newParams }).catch(err => {});
      this.getCollection();
    }

  }
};
</script>
