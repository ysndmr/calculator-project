$(document).ready(function () {
    class ThemeManager {
        constructor() {
            this.themeSwitch = $('#theme-switch');
            this.currentTheme = localStorage.getItem('theme') || 'light';
            this.body = $('body');
            this.init();
        }

        init() {
            this.applyCurrentTheme();
            this.themeSwitch.prop('checked', this.currentTheme === 'dark');
            this.themeSwitch.on('change', () => this.toggleTheme());
        }

        applyCurrentTheme() {
            this.body.addClass(this.currentTheme);
        }

        toggleTheme() {
            if (this.themeSwitch.is(':checked')) {
                this.body.removeClass('light').addClass('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                this.body.removeClass('dark').addClass('light');
                localStorage.setItem('theme', 'light');
            }
        }
    }

    new ThemeManager();
});
