import {SWITCH_LANGUAGE, WINDOW_WIDTH} from "../../constants/ActionTypes";
import {
  LAYOUT_TYPE,
  LAYOUT_TYPE_FULL,
  NAV_STYLE,
  NAV_STYLE_FIXED,
  THEME_COLOR,
  THEME_TYPE,
  THEME_TYPE_SEMI_DARK
} from "../../constants/ThemeSetting";

const initialSettings = {
  navStyle: NAV_STYLE_FIXED,
  layoutType: LAYOUT_TYPE_FULL,
  themeType: THEME_TYPE_SEMI_DARK,
  themeColor: THEME_COLOR,

  width: window.innerWidth,
  isDirectionRTL: false,
  locale: {
    languageId: 'english',
    locale: 'en',
    name: 'English',
    icon: 'us'
  },

  cookiesaceptadas : false,
  leyendopoliticas : false
};

const settings = (state = initialSettings, action) => {
  switch (action.type) {

    case WINDOW_WIDTH:
      return {
        ...state,
        width: action.width,
      };
    case THEME_TYPE:
      return {
        ...state,
        themeType: action.themeType
      };
    case THEME_COLOR:
      console.log("yes", action.themeColor);
      return {
        ...state,
        themeColor: action.themeColor
      };

    case NAV_STYLE:
      return {
        ...state,
        navStyle: action.navStyle
      };
    case LAYOUT_TYPE:
      return {
        ...state,
        layoutType: action.layoutType
      };

    case SWITCH_LANGUAGE:
      return {
        ...state,
        locale: action.payload,

      };

    case "ACEPTAR_COOKIES_CONFIGURACION":
      return {
        ...state,
        cookiesaceptadas : action.payload
      }
    case "LEYENDO_COOKIES_CONFIGURACION":
      return {
        ...state,
        leyendopoliticas : action.payload
      }
    default:
      return state;
  }
};

export default settings;
