//Create an options object with the same scopes from the login
const options =
    new MicrosoftGraph.MSALAuthenticationProviderOptions([
        'user.read',
        'calendar.read'
    ]);

const authProvider =
    new MicrosoftGraph.implicitMSALAuthenticationProvider(msalClient, options);

const graphClient =  MicrosoftGraph.Client.initWithMiddleware({authProvider});

async function getEvent(){
    try{
        let events = await graphClient
            .api('/me/events')
            .select('subject.organizer,start,end')
            .orderby('createdDateTime DESC')
            .get();

        updatePage(msalClient.getAccount(), Views.calendar, events);
    }catch(error){
        updatePage(msalClient.getAccount(), Views.error, {
            message: 'Error getting events',
            debug: error
        });
    }
}