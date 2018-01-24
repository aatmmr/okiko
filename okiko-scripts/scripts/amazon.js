const { OperationHelper } = require('apac');
const fs = require('fs');

const opHelper = new OperationHelper({
    // credentials here...
    maxRequestsPerSecond: 1,
    locale: 'DE'
});

const monthsToYears = (monthStr) => String(Number(monthStr) / 12);

// input: itemId: String - EAN,
module.exports = function AmazonItemLookup(itemId) {
  return opHelper.execute('ItemLookup', {
    'ItemId': itemId,
    'IdType': 'EAN',
    'ResponseGroup': 'ItemAttributes, EditorialReview',
    'SearchIndex': 'All',
  }).then((response) => {
    const item = response.result.ItemLookupResponse.Items.Item;
    const isItemArray = Array.isArray(item);
    const { ItemAttributes } = isItemArray ? item[0] : item;
    
    // check if age info exist
    const age = ItemAttributes.ManufacturerMinimumAge && ItemAttributes.ManufacturerMinimumAge._
        ? monthsToYears(ItemAttributes.ManufacturerMinimumAge._) : null;
    return { 
        title: ItemAttributes.Title,
        age
    }
  }).catch((err) => {
    // console.error("Something went wrong! ", itemId, err);
    return {};
  });
}

// need to set a delay for requests
/*
readData('./results/duo/no_age_2.csv')
    .then(data => {
        const itemNames = data.toString().split('\n')
            .splice(1).map((entry, i) => {
                const entries = entry.split(',');
                const EAN = entries[0];
                const link = entries[2];
                const imgLink = entries[3];
                setTimeout(() => AmazonItemLookup(EAN, link, imgLink), i * MILISECOND_MULTIPLIER)
            });    
    });
*/