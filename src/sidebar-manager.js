$(document).ready(function () {
    class SidebarManager {
        constructor() {
            this.readmeButton = $('#readme-button');
            this.readmeSidebar = $('#readme-sidebar');
            this.closeButton = $('#close-button');
            this.body = $('body');

            this.init();
        }

        init() {
            this.readmeButton.on('click', () => this.toggleSidebar());
            this.closeButton.on('click', () => this.closeSidebar());
            this.closeSidebar();
        }

        toggleSidebar() {
            this.readmeSidebar.toggleClass('active');
            this.body.toggleClass('active');
        }

        closeSidebar() {
            if (this.body.hasClass('active')) {
                this.body.removeClass('active');
                this.readmeSidebar.removeClass('active');
            }
        }
    }

    new SidebarManager();
});
