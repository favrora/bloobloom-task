<template>
  <div class="view">

  </div>
</template>

<script>
const collectionURL = 'https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections';
// https://bloobloom.com/collections/spectacles-women

export default {
  name: "Content",
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
      console.log(data);
      console.log(window.location.pathname);

      // Выбираем коллекцию на основе url адреса страницы
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].configuration_name);
      }
    }
  }
};
</script>
