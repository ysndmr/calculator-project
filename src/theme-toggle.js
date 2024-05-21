$(document).ready(function () {
    // ThemeManager class to handle theme switching functionality
    class ThemeManager {
        constructor() {
            this.themeSwitch = $('#theme-switch');
            this.currentTheme = localStorage.getItem('theme') || 'light';
            this.init();
        }

        // Initialize theme manager
        init() {
            this.applyCurrentTheme();
            this.themeSwitch.prop('checked', this.currentTheme === 'dark');
            this.themeSwitch.on('change', () => this.toggleTheme());
        }

        // Apply the current theme to the body
        applyCurrentTheme() {
            $('body').addClass(this.currentTheme);
        }

        // Toggle between light and dark themes
        toggleTheme() {
            if (this.themeSwitch.is(':checked')) {
                $('body').removeClass('light').addClass('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                $('body').removeClass('dark').addClass('light');
                localStorage.setItem('theme', 'light');
            }
        }
    }

    // SidebarManager class to handle the README sidebar
    class SidebarManager {
        constructor() {
            this.readmeButton = $('#readme-button');
            this.readmeSidebar = $('#readme-sidebar');
            this.init();
        }

        // Initialize sidebar manager
        init() {
            this.readmeButton.on('click', () => this.toggleSidebar());
        }

        // Toggle the sidebar visibility
        toggleSidebar() {
            this.readmeSidebar.toggleClass('active');
        }
    }


    // Instantiate the ThemeManager class
    new ThemeManager();
    new SidebarManager();

});
