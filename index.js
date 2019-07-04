/*
The person who associated a work with this deed has dedicated the work to the
public domain by waiving all of his or her rights to the work worldwide under
copyright law, including all related and neighboring rights, to the extent
allowed by law.

You can copy, modify, distribute and perform the work, even for commercial
purposes, all without asking permission.

AFFIRMER OFFERS THE WORK AS-IS AND MAKES NO REPRESENTATIONS OR WARRANTIES OF
ANY KIND CONCERNING THE WORK, EXPRESS, IMPLIED, STATUTORY OR OTHERWISE,
INCLUDING WITHOUT LIMITATION WARRANTIES OF TITLE, MERCHANTABILITY, FITNESS FOR
A PARTICULAR PURPOSE, NON INFRINGEMENT, OR THE ABSENCE OF LATENT OR OTHER
DEFECTS, ACCURACY, OR THE PRESENT OR ABSENCE OF ERRORS, WHETHER OR NOT
DISCOVERABLE, ALL TO THE GREATEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW.

For more information, please see
<http://creativecommons.org/publicdomain/zero/1.0/>
*/

const axios = require('axios');


let key, appId, baseURL, headers;


/**
 * --- TODO ---
 */
function msaic(client)
{
    if (!client.key)
        throw new Error('Could not connect withou the API key');

    if (!client.appId)
        throw new Error('The Application Insights is must be defined');

    key     = client.key;
    appId   = client.appId;
    baseURL = `https://api.applicationinsights.io/v1/apps/${appId}/`;
    headers = {
        'X-Api-Key': key,
    };

    return {
        AppInsightsMetrics,
    };
}


/**
 * --- TODO ---
 */
class ProxiedClass
{
    constructor(getset = {})
    {
        return new Proxy(this, getset);
    }
}


/**
 * --- TODO ---
 */
class API extends ProxiedClass
{
    constructor()
    {
        super({get: (self, func) => {
            const f = self[func];

            if (f) return f;
            return (...params) => {
                return self._perform(func, ...params);
            };
        }});
    }

    async _request(url, method = 'get')
    {
        const payload = { url, method, baseURL, headers };

        try {
            const res = await axios(payload);
            return JSON.stringify(res.data);
        }
        catch (e) {
            throw new Error(e);
        }
    }

    /* eslint-disable-next-line no-unused-vars  */
    async _perform(action, ...params) {}
}


/**
 * --- TODO ---
 */
class AppInsightsMetrics extends API
{
    constructor()
    {
        super();
    }

    /* eslint-disable-next-line no-unused-vars  */
    async _perform(action, ...params)
    {
        const resource = {
            all:                        ['metrics/metadata'],
            requestsCount:              ['metrics/requests/count'],
            requestsDuration:           ['metrics/requests/duration'],
            requestsFailed:             ['metrics/requests/failed'],
            usersCount:                 ['metrics/users/count'],
            usersAuthenticated:         ['metrics/users/authenticated'],
            pageViewsCount:             ['metrics/pageViews/count'],
            pageViewsDuration:          ['metrics/pageViews/duration'],
            customEventsCount:          ['metrics/customEvents/count'],
            browserProcessingDuration:  ['metrics/browserTimings/processingDuration'],
            browserReceiveDuration:     ['metrics/browserTimings/receiveDuration'],
            browserNetworkDuration:     ['metrics/browserTimings/networkDuration'],
            browserSendDuration:        ['metrics/browserTimings/sendDuration'],
            browserTotalDuration:       ['metrics/browserTimings/totalDuration'],
            dependenciesCount:          ['metrics/dependencies/count'],
            dependenciesDuration:       ['metrics/dependencies/duration'],
            dependenciesFailed:         ['metrics/dependencies/failed'],
            exceptionsCount:            ['metrics/exceptions/count'],
            exceptionsBrowser:          ['metrics/exceptions/browser'],
            exceptionsServer:           ['metrics/exceptions/server'],
            sessionsCount:              ['metrics/sessions/count'],
            perfRequestExecutionTime:   ['metrics/performanceCounters/requestExecutionTime'],
            perfRequestsPerSecond:      ['metrics/performanceCounters/requestsPerSecond'],
            perfRequestsInQueue:        ['metrics/performanceCounters/requestsInQueue'],
            perfMemoryAvailable:        ['metrics/performanceCounters/memoryAvailableBytes'],
            perfExceptionsPerSecond:    ['metrics/performanceCounters/exceptionsPerSecond'],
            perfProcessCpuPercentage:   ['metrics/performanceCounters/processCpuPercentage'],
            perfIOPerSecond:            ['metrics/performanceCounters/processIOBytesPerSecond'],
            perfProcessPrivateBytes:    ['metrics/performanceCounters/processPrivateBytes'],
            perfProcessorCpuPercentage: ['metrics/performanceCounters/processorCpuPercentage'],
            availabilityCount:          ['metrics/availabilityResults/count'],
            availabilityPercentage:     ['metrics/availabilityResults/availabilityPercentage'],
            availabilityDuration:       ['metrics/availabilityResults/duration'],
        };

        if (!resource[action])
            throw new Error(`Unknown method "${action}"`);

        return this._request(...resource[action]);
    }
}


module.exports = msaic;
