let color = {
    bg: '#272727',
    bgNight: '#222222',
    bgLight: '#242424',
    main: '#18A6FF',
    mainTransparent: '',
};

color.mainTransparent = `${color.main}A4`;


function changeColor(change) {
    color.main = change;
}

export default color;