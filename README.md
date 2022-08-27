<p align="left">
    <img alt="Repository size" src="https://img.shields.io/github/repo-size/favrora/bloobloom-task?color=blue">
</p>


# Bloobloom Test Task

The test task is 100% completed and here I will tell you how I solved the task and what I used.

* Stack: `Vue.js` `HTML5` `CSS 3.0`
* Plugins: `vue-router` `bootstrap` `prettier`  `vue-infinite-scroll`
* Completed functionality: responsive design, menu opening animation, color and shape filters, infinity scrolling, loading animation (loader), no results block

I also commented my code very well so you can understand my solution better. The project interacts with the bloobloom staging API and receives all the data from there. I made the site design and animation very similar to your bloobloom.com site.

The design is responsive for all devices, I also adapted the menu for mobile devices and added back buttons so that users can easily close submenu.

For infinite scrolling, I used the `vue-infinite-scroll` plugin, which calls the function to send a request to the API when the scroll reaches the end of the block.

## Preview

https://user-images.githubusercontent.com/56507678/187029940-28e9d22b-d956-40b8-86c0-5207719d59a6.mp4


## Development

Getting Start:
* Open a terminal. 
* Go to the folder where you want to copy the project. 
* Copy the project with this command:

    ```sh
    $ git clone https://github.com/favrora/bloobloom-task.git
    ```

* Go to the project folder:

    ```sh
    $ cd bloobloom-task
    ```

In order to run it locally you'll need to fetch some dependencies and a basic server setup.

* Install local dependencies:

    ```sh
    $ npm install
    ```

* Start the development server and open [`http://localhost:8080`](http://localhost:8080).

    ```sh
    $ npm run serve
    ```
