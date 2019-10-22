import { createSelector } from 'reselect';

const getPaperclips = (state) => state.business.paperClips;

export const getPaperclipsState = createSelector(
    [getPaperclips],
    (paperClips) => paperClips
);

const getClipsPerSec = (state) => state.business.clipsPerSec;

export const getClipsPerSecState = createSelector(
    [getClipsPerSec],
    (x) => x
);

const getFunds = (state) => state.business.funds;

export const getFundsState = createSelector(
    [getFunds],
    (x) => x
);

const getPaperclipPrice = (state) => state.business.paperclipPrice;

export const getPaperclipPriceState = createSelector(
    [getPaperclipPrice],
    (x) => x
);

const getUnsoldInventory = (state) => state.business.unsoldInventory;

export const getUnsoldInventoryState = createSelector(
    [getUnsoldInventory],
    (x) => x
);

const getPublicDemand = (state) => state.business.publicDemand;

export const getPublicDemandState = createSelector(
    [getPublicDemand],
    (x) => x
);

const getMarketingLevel = (state) => state.business.marketingLevel;

export const getMarketingLevelState = createSelector(
    [getMarketingLevel],
    (x) => x
);

const getMarketingCost = (state) => state.business.marketingCost;

export const getMarketingCostState = createSelector(
    [getMarketingCost],
    (x) => x
);

const getMarketingButtonDisabled = (state) => state.business.marketingButtonDisabled;

export const getMarketingButtonDisabledState = createSelector(
    [getMarketingButtonDisabled],
    (x) => x
);

const getDelay = (state) => state.business.delay;

export const getDelayState = createSelector(
    [getDelay],
    (x) => x
);

const getWire = (state) => state.business.wire;

export const getWireState = createSelector(
    [getWire],
    (x) => x
);

const getWirePrice = (state) => state.business.wirePrice;

export const getWirePriceState = createSelector(
    [getWirePrice],
    (x) => x
);

const getWireButtonDisabled = (state) => state.business.wireButtonDisabled;

export const getWireButtonDisabledState = createSelector(
    [getWireButtonDisabled],
    (x) => x
);

const getAutoClippersPerSec = (state) => state.business.autoClippersPerSec;

export const getAutoClippersPerSecState = createSelector(
    [getAutoClippersPerSec],
    (x) => x
);

const getAutoClipperInitPrice = (state) => state.business.autoClipperInitPrice;

export const getAutoClipperInitPriceState = createSelector(
    [getAutoClipperInitPrice],
    (x) => x
);

const getAutoClipperPrice = (state) => state.business.autoClipperPrice;

export const getAutoClipperPriceState = createSelector(
    [getAutoClipperPrice],
    (x) => x
);

const getMegaClipperInitPrice = (state) => state.business.megaClipperInitPrice;

export const getMegaClipperInitPriceState = createSelector(
    [getMegaClipperInitPrice],
    (x) => x
);

const getMegaClipperPrice = (state) => state.business.megaClipperPrice;

export const getMegaClipperPriceState = createSelector(
    [getMegaClipperPrice],
    (x) => x
);

const getAutoClippersButtonDisabled = (state) => state.business.autoClippersButtonDisabled;

export const getAutoClippersButtonDisabledState = createSelector(
    [getAutoClippersButtonDisabled],
    (x) => x
);

const getMegaClippersButtonDisabled = (state) => state.business.megaClippersButtonDisabled;

export const getMegaClippersButtonDisabledState = createSelector(
    [getMegaClippersButtonDisabled],
    (x) => x
);

const getAutoClipperOn = (state) => state.business.autoClipperOn;

export const getAutoClipperOnState = createSelector(
    [getAutoClipperOn],
    (x) => x
);

const getTrust = (state) => state.business.trust;

export const getTrustState = createSelector(
    [getTrust],
    (x) => x
);
// state.business.trust

/**
* Selectors
*/

// import * as Selectors from '../../../../reducers/selectors';