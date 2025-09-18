var map = L.map('map').setView([33.4332, -111.9758], 11);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap :3</a>'
}).addTo(map);

var vmLRV = L.icon({
    iconUrl: `/valleymetromap/vmLRV.png`,
    iconSize: [15,20],
    iconAnchor: [0,0],
    popupAnchor: [10,0]
});

var busIcon = L.Icon.extend({
    options: {
        iconSize: [20,20],
        iconAnchor: [0,0],
        popupAnchor: [10,0]
    }
});

var vmBusIcon = new busIcon({iconUrl: `/valleymetromap/vmBusIcon.png`}),
    vmBusIconExpressRapid = new busIcon({iconUrl: `/valleymetromap/vmBusIconExpressRapid.png`}),
    vmBusIconNeighborhood = new busIcon({iconUrl: `/valleymetromap/vmBusIconNeighborhood.png`}),
    vmNotInService = new busIcon({iconUrl: `/valleymetromap/vmNotInService.png`});

//L.marker([33.4482, -112.0777], {icon: vmBusIcon}).addTo(map);
const vm_api_url = 'https://mna.mecatran.com/utw/ws/gtfsfeed/vehicles/valleymetro?apiKey=4f22263f69671d7f49726c3011333e527368211f&asJson=true'
const iconLayer = L.layerGroup().addTo(map);

async function getLocations(){
    try{
        const response = await fetch(vm_api_url);
        if(!response.ok){
            throw new Error(`Response Status: ${response.status}`);
        }
        const json = await response.json();
        iconLayer.clearLayers();
        json.entity.forEach(v => {
            const latitude = v.vehicle?.position?.latitude;
            const longitude = v.vehicle?.position?.longitude;
            const idNum = v.vehicle?.vehicle?.id;
            const finalDestination = v.vehicle?.vehicle?.label;
            const routeId = v.vehicle?.trip?.routeId;
            const rapidRoutes = ["514", "521", "522", "531", "533", "535", "542", "562", "563", "571", "573", "575", "I10E", "I10W", "I17", "SME", "SMW", "SR51"];
            const circulators = ["68CM", "ALEX", "DASH", "DBUZ", "FBUZ", "EART", "FLSH", "GUS1", "GUS2", "GUS3", "JUPI", "MARS", "MARY", "MERC", "MLHD", "MSTG", "SMRT", "STRN", "VENU"];
            const rail = ["A", "B", "S"];

            //Vehicle Type Display

            let vehicleType =  `Unknown Make/Model`;
            //RAIL
            if(idNum >= 101 && idNum <= 150){
                vehicleType = `KinkiSharyo LF LRV`                    
            }
            else if(idNum >=180 && idNum <= 185){
                vehicleType = `Brookville Liberty Streetcar`
            }
            else if(idNum >= 201 && idNum <= 225){
                vehicleType = `Siemens S700 LRV`
            }
            //BusFleet
            else if(idNum >= 1605 && idNum <= 1611) {
                vehicleType = `2017 ENC EZ Rider II CNG 32'`
            }
            else if(idNum >= 1631 && idNum <= 1642) {
                vehicleType = `2019 ENC EZ Rider II CNG 32'`
            }
            else if(idNum == 1612 || (idNum >= 1623 && idNum <= 1627)){
                vehicleType = `2018 ENC EZ Rider II CNG 32'`
            }
            else if(idNum >= 1617 && idNum <= 1622){
                vehicleType = `2018 ARBOC Spirit of Liberty 29'`
            }
            else if(idNum >=1628  && idNum <=1630){
                vehicleType = `2018 Freightliner S2 (StarTrans P/S2C)`
            }
            else if(idNum >=1631  && idNum <=1642){
                vehicleType = `2019 ENC E-Z Rider II BRT CNG 32'`
            }
            else if(idNum == 1643){
                vehicleType = `2020 ARBOC Freedom`
            }
            else if(idNum>=1644  && idNum <=1649){
                vehicleType = `2020 ARBOC Equess`
            }
            else if (idNum >= 1650 && idNum <= 1666) {
                vehicleType = `2021 Gillig Low Floor CNG 29'`
            } 
            else if (idNum >= 1667 && idNum <= 1672) {
                vehicleType = `2022 Gillig Low Floor CNG 29'`
            }
            else if (idNum >= 2401 && idNum <= 2420) {
                vehicleType = `2024 Gillig Low Floor CNG 40'`
            }
            else if (idNum >= 3003 && idNum <= 3005) {
                vehicleType = `2016 Ford E-450 (Starcraft Allstar)`
            } 
            else if (idNum >= 3006 && idNum <= 3008) {
                vehicleType = `2020 Ford E-450 (Starcraft Allstar)`
            } 
            else if (idNum >= 3009 && idNum <= 3011) {
                vehicleType = `2021 Ford E-450 (Starcraft Allstar)`
            } 
            else if (idNum >= 3012 && idNum <= 3018) {
                vehicleType = `2022 Ford E-450 (Starcraft Allstar)`
            }
            else if (idNum >= 3019 && idNum <= 3022) {
                vehicleType = `2023 Ford E-450 (Starcraft Allstar)`
            }
            else if (idNum >= 4501 && idNum <= 4504) {
                vehicleType = `2013 Gillig Low Floor Trolley Replica HEV 29'`
            }
            else if (idNum >= 4505 && idNum <= 4508) {
                vehicleType = `2013 Gillig Low Floor HEV 29'`
            }
            else if (idNum >= 4509 && idNum <= 4513) {
                vehicleType = `2013 Gillig Low Floor HEV 35'`
            }
            else if (idNum >= 4514 && idNum <= 4517) {
                vehicleType = `2017 Gillig Low Floor CNG 35'`
            }
            else if (idNum >= 4518 && idNum <= 4521) {
                vehicleType = `2018 Gillig Low Floor CNG 29'`
            }
            else if (idNum >= 4522 && idNum <= 4524) {
                vehicleType = `2018 Gillig Low Floor CNG 35'`
            }
            else if (idNum >= 5001 && idNum <= 5120) {
                vehicleType = `2014 New Flyer C40LFR`
            }
            else if (idNum >= 5121 && idNum <= 5200) {
                vehicleType = `2016 Gillig Low Floor CNG 40'`
            }
            else if (idNum >= 5201 && idNum <= 5240) {
                vehicleType = `2017 Gillig Low Floor CNG 40'`
            }
            else if (idNum >= 5241 && idNum <= 5274) {
                vehicleType = `2018 Gillig Low Floor CNG 40'`
            }
            else if (idNum >= 5275 && idNum <= 5278) {
                vehicleType = `2020 New Flyer XN40`
            }
            else if (idNum >= 5279 && idNum <= 5318) {
                vehicleType = `2023 Gillig Low Floor CNG 40'`
            }
            else if (idNum >= 5319 && idNum <= 5336) {
                vehicleType = `2023 Gillig Low Floor CNG 40'`
            } 
            else if (idNum >= 5337 && idNum <= 5353) {
                vehicleType = `2024 Gillig Low Floor CNG 40'`
            }
            else if (idNum >= 5400 && idNum <= 5419) {
                vehicleType = `2025 Gillig Low Floor Plus EV 40'`
            }
            else if (idNum >= 5600 && idNum <= 5611) {
                vehicleType = `2018 Gillig Low Floor 40'`
            } 
            else if (idNum >= 5612 && idNum <= 5644) {
                vehicleType = `2019 Gillig Low Floor 40'`
            } 
            else if (idNum >= 5645 && idNum <= 5661) {
                vehicleType = `2020 New Flyer XD40`
            } 
            else if (idNum >= 5662 && idNum <= 5691) {
                vehicleType = `2021 New Flyer XD40`
            } 
            else if (idNum >= 5692 && idNum <= 5711) {
                vehicleType = `2024 New Flyer XDE40`
            } 
            else if (idNum >= 5712 && idNum <= 5736) {
                vehicleType = `2025 New Flyer XDE40`
            }
            else if (idNum >= 6676 && idNum <= 6697) {
                vehicleType = `2011 New Flyer C40LFR`
            } 
            else if (idNum >= 6698 && idNum <= 6713) {
                vehicleType = `2012 New Flyer C40LFR`
            } 
            else if (idNum >= 6714 && idNum <= 6733) {
                vehicleType = `2012 New Flyer C40LFR (Suburban)`
            } 
            else if (idNum >= 6734 && idNum <= 6749) {
                vehicleType = `2012 New Flyer C40LFR`
            } 
            else if (idNum >= 6750 && idNum <= 6758) {
                vehicleType = `2016 Gillig Low Floor CNG 40'`
            } 
            else if (idNum >= 6759 && idNum <= 6670) {
                vehicleType = `2017 Gillig Low Floor CNG 40'`
            } 
            else if (idNum >= 6671 && idNum <= 6810) {
                vehicleType = `2018 Gillig Low Floor CNG 40'`
            } 
            else if (idNum >= 6811 && idNum <= 6822) {
                vehicleType = `2018 New Flyer XN40`
            }
            else if(idNum >= 6823 && idNum <= 6846){
                vehicleType = `2019 New Flyer XN40`
            }
            else if(idNum >= 6847 && idNum <= 6873){
                vehicleType = `2020 New Flyer XN40`
            }
            else if(idNum >= 6874 && idNum <= 6885){
                vehicleType = `2021 New Flyer XD40`
            }
            else if(idNum >= 6886 && idNum <= 6898){
                vehicleType = `2021 New Flyer XN40`
            }
            else if(idNum >= 7001 && idNum <= 7009){
                vehicleType = `2010 New Flyer D40LFA`
            }
            else if(idNum >= 7010 && idNum <= 7013) {
                vehicleType = `2020 MCI D45CRT LE`
            }
            else if(idNum >= 7014 && idNum <= 7033){
                vehicleType = `2021 MCI D45CRT LE`
            }
            else if(idNum >= 7165 && idNum <= 7172){
                vehicleType = `2016 New Flyer XN60`
            }
            else if(idNum >= 7173 && idNum <= 7174){
                vehicleType = `2018 New Flyer XN60`
            }
            else if(idNum >= 7175 && idNum <= 7185){
                vehicleType = `2019 New Flyer XN60`
            }
            else if(idNum >= 7186 && idNum <= 7192){
                vehicleType = `2020 New Flyer XN60`
            }
            else if(idNum >= 7300 && idNum <= 7309){
                vehicleType = `2017 New Flyer XN40`
            }
            else if(idNum >= 7310 && idNum <= 7323){
                vehicleType = `2019 New Flyer XN40`
            }
            else if(idNum >= 7324 && idNum <= 7328){
                vehicleType = `2020 New Flyer XN40`
            }
            else if(idNum >= 8065 && idNum <= 8081){
                vehicleType = `2011 New Flyer DE60LFR`
            }
            else if(idNum >= 8082 && idNum <= 8101){
                vehicleType = `2016 New Flyer XD60`
            }
            else if(idNum >= 8102 && idNum <= 8121){
                vehicleType = `2017 New Flyer XD60`
            }
            else if(idNum >= 8122 && idNum <= 8127){
                vehicleType = `2019 New Flyer XD60`
            }
            else if(idNum >= 8128 && idNum <= 8155){
                vehicleType = `2020 New Flyer XD60`
            }
            else if(idNum >= 8521 && idNum <= 8530){
                vehicleType = `2017 New Flyer XN60`
            }
            else {
                vehicleType = `Unknown Bus Model`;
            }

            //Display if not in service
            let routeDisplay = `Route: <strong>${routeId}</strong>`;
            if(routeId == undefined){
                routeDisplay = `Not in Service`;
            }

            let finalDestinationDisplay = `Final Destination of <strong>${finalDestination}</strong>`;
            if(finalDestination == undefined){
                finalDestinationDisplay = `Final Destination of <strong>Nowhere in Particular<strong>`;
            }

            //Determines the marker on the map
            if((idNum > 100 && idNum < 300)){
                //if statement prevents lrvs from showing up in strange places on the map
                if(routeId == undefined){}
                else{
                    L.marker([latitude, longitude], {icon: vmLRV}).addTo(iconLayer).bindPopup(`<strong>${vehicleType}</strong> (${idNum})<br>${routeDisplay}<br>${finalDestinationDisplay}`);
                }
            }
            else if(routeId == undefined){
                L.marker([latitude, longitude], {icon: vmNotInService}).addTo(iconLayer).bindPopup(`<strong>${vehicleType}</strong> (${idNum})<br>${routeDisplay}<br>${finalDestinationDisplay}`);

            }
            else if(rapidRoutes.includes(routeId)){
                L.marker([latitude, longitude], {icon: vmBusIconExpressRapid}).addTo(iconLayer).bindPopup(`<strong>${vehicleType}</strong> (${idNum})<br>${routeDisplay}<br>${finalDestinationDisplay}`);
            }
            else if(circulators.includes(routeId)){
                L.marker([latitude, longitude], {icon: vmBusIconNeighborhood}).addTo(iconLayer).bindPopup(`<strong>${vehicleType}</strong> (${idNum})<br>${routeDisplay}<br>${finalDestinationDisplay}`);
            }
            else{
                L.marker([latitude, longitude], {icon: vmBusIcon}).addTo(iconLayer).bindPopup(`<strong>${vehicleType}</strong> (${idNum})<br>${routeDisplay}<br>${finalDestinationDisplay}`);
            }
        });
        console.log(`Map Updated`);
    }
    catch(error){
        console.error(error.message);
    }
}

getLocations();
setInterval(getLocations, 20000)
