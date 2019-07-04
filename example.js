const appId = process.env.APPLICATION_INSIGHTS_ID;
const key   = process.env.APPLICATION_INSIGHTS_API_KEY;


(async () => {
    const msaic = require('.')({ key, appId });

    const metrics = new msaic.AppInsightsMetrics();
    const res = await metrics.requestsCount();

    console.log(res);
})();
