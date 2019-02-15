import Map from 'esri/Map';
import MapView from 'esri/views/MapView';
import Legend from 'esri/widgets/Legend';

import layerFactory from 'utils/layerFactory.util';

import {
  INIT_MAP,
  MAPVIEW_LOAD_ERROR,
  TOGGLE_VISIBLE_LAYER,
  LAYER_INFO_RECEIVED,
  FETCHING_LAYER_INFO,
} from 'constants/actionTypes';

import config from 'config/config';

const arcgis = {};

window.arcgis = arcgis;

const esriMiddleware = store => next => (action) => {
  switch (action.type) {
    case INIT_MAP: {
      if (!action.container || arcgis.container) { break; }

      const map = new Map(config.esri.map);
      arcgis.map = map;

      arcgis.container = action.container;

      arcgis.mapView = new MapView({
        map: arcgis.map,
        container: arcgis.container,
        center: [-77.0910, 38.8816],
        zoom: 12,
      });

      const mapLayers = [];

      config.layers.forEach((l) => {
        const layer = layerFactory(l);

        if (layer) {
          mapLayers.push(layer);
        }
      });

      map.addMany(mapLayers);

      arcgis.legend = new Legend({
        view: arcgis.mapView,
      });

      arcgis.mapView.ui.add(arcgis.legend, 'top-right');

      arcgis.mapView.when(() => {
        arcgis.mapView.on('click', (event) => {
          const fetchingAction = { type: FETCHING_LAYER_INFO };
          store.dispatch(fetchingAction);
          arcgis.mapView.hitTest(event).then((response) => {
            const attributes = (response.results
              && response.results.length > 0
              && response.results[0].graphic
              && response.results[0].graphic.attributes)
              || {};

            const infoReceivedAction = {
              type: LAYER_INFO_RECEIVED,
              attributes,
            };
            setTimeout(() => {
              store.dispatch(infoReceivedAction);
            }, 2000);
          });
        });
        next({ ...action, mapLayers });
      }, (e) => {
        console.error(e);
        next({
          type: MAPVIEW_LOAD_ERROR,
          hasError: true,
          error: e,
        });
      });
      break;
    }
    case TOGGLE_VISIBLE_LAYER: {
      if (!action.id) { break; }

      const layer = arcgis.map.findLayerById(action.id);
      layer.visible = !layer.visible;

      next(action);
      break;
    }
    default:
      next(action);
  }
  return null;
};

export default esriMiddleware;
