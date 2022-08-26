<template>
  <div class="content">

    <div class="filter-row row">
      <div class="filter-box col-0 col-md-4"></div>

      <div class="filter-box title-box col-12 col-sm-6 col-md-4">
        <h1>{{ mainTitle }}</h1>
      </div>

      <div class="filter-box col-12 col-sm-6 col-md-4">
        <div class="filters-menu">
          <div>Colour</div>
          <div>Shape</div>
        </div>
      </div>
    </div>


    <div class="row items">
      <div class="item col-12 col-sm-6 col-md-4"">A</div>

      <div class="item col-12 col-sm-6 col-md-4"">A</div>

      <div class="item col-12 col-sm-6 col-md-4"">A</div>

      <div class="item col-12 col-sm-6 col-md-4"">A</div>
    </div>
    

  </div>
</template>

<script>
const collectionURL = 'https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections';

export default {
  name: "Content",
  data() {
    return {
      mainTitle: "Spectacles Women"
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
        }

      }
    }
  }
};
</script>
