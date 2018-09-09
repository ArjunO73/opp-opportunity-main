({
    toastInfo: function(cmp,evt,hlp) {
    	console.log("Toast!!");
        var response = evt.getParams().type;
        var object = evt.getParams()["messageTemplateData"];
        if(typeof(object) != "undefined" && object != ""){
            object = object[0];
        }
        if(response == "SUCCESS" && object == "Event")
        {//var recId = evt.getParam("messageTemplateData")[1].executionComponent["attributes"].recordId;
        	hlp.getEvents(cmp);
        	$("#calendar").fullCalendar('removeEventSource',cmp.get('v.events'));
        }    
    },
    createNewEvent: function(cmp, evt, hlp){
        console.log("create Event");
        var todayDate = new Date();
        var today = todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-"+todayDate.getDate()+"T00:00:00.000Z";
    	var createRecordEvent = $A.get("e.force:createRecord");
    	createRecordEvent.setParams({
            "entityApiName": "Event",
            "navigationLocation": "LOOKUP",
            "defaultFieldValues": {
                StartDateTime: today,
                EndDateTime: today,
                ActivityDateTime: today,
                DurationInMinutes: 1440,
                IsAllDayEvent: true
            },
            "panelOnCreateCallback":function(evt){
                console.log("EventCreated");
            }
        }).fire();
    },
    handleMenuSelect: function(cmp, evt,hlp){
       var selectedMenuItemValue = evt.getParam("value");
        switch(selectedMenuItemValue)
        {
            case "month":
                $('#calendar').removeClass('resetWidth');
                $('#gmaps').addClass('visibility');
        		$A.enqueueAction(cmp.get('c.month'));
                break;
            
            case "basicWeek":
                $('#calendar').removeClass('resetWidth');
                $('#gmaps').addClass('visibility');
                $A.enqueueAction(cmp.get('c.basicWeek'));
                break;
                
            case "listWeek":
                $('#calendar').removeClass('resetWidth');
                $('#gmaps').addClass('visibility');
                $A.enqueueAction(cmp.get('c.listWeek'));
                break;
                
            case "basicDay":
                $('#calendar').removeClass('resetWidth');
                $('#gmaps').addClass('visibility');
                $A.enqueueAction(cmp.get('c.basicDay'));
                break;
                
            case "listDay":
                $A.enqueueAction(cmp.get('c.listDay'));
                break;
        }
    },
	doInit : function(cmp,evt,hlp) {
		//hlp.getEvents(cmp);
	},
	prev : function(cmp, evt, hlp) {
		$('#calendar').fullCalendar('prev');
		hlp.setCalendarDate(cmp);
        hlp.modifyCalendarDOM();  
	},
	next : function(cmp, evt, hlp) {
		$('#calendar').fullCalendar('next');
		hlp.setCalendarDate(cmp);
        hlp.modifyCalendarDOM();  
	},
	today : function(cmp, evt, hlp) {
		$('#calendar').fullCalendar('today');
		hlp.setCalendarDate(cmp);
        hlp.modifyCalendarDOM();  
	},
	month : function(cmp, evt, hlp) {
		$('#calendar').fullCalendar('changeView','month');
		cmp.set('v.view','month');
		hlp.setCalendarDate(cmp);
        hlp.modifyCalendarDOM();  
	},
	basicWeek : function(cmp, evt, hlp) {
		$('#calendar').fullCalendar('changeView','basicWeek');
		cmp.set('v.view','basicWeek');
		hlp.setCalendarDate(cmp);
	},
	listWeek : function(cmp, evt, hlp) {
		$('#calendar').fullCalendar('changeView','listWeek');
		cmp.set('v.view','listWeek');
		hlp.setCalendarDate(cmp);
	},
	basicDay : function(cmp, evt, hlp) {
		$('#calendar').fullCalendar('changeView','basicDay');
		cmp.set('v.view','basicDay');
		hlp.setCalendarDate(cmp);
	},
	listDay : function(cmp, evt, hlp) {
		$('#calendar').fullCalendar('changeView','listDay');
		cmp.set('v.view','listDay');
        if(cmp.get('v.dayClick') != "true")
            hlp.setCalendarDate(cmp);
        else
           cmp.set('v.dayClick',''); 
        $('#calendar').addClass('resetWidth');
        $('#gmaps').removeClass('visibility');
        var action = cmp.get('c.checkGeoLocation');
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var location = response.getReturnValue();
                console.log("location");
                console.log(location);
                $("#gmaps iframe").attr("src","https://www.google.com/maps/embed/v1/place?q="+location+"&key=AIzaSyDBBRWOn_l94O3FvU7dfPfQVN0vLHBRIrI");
            }
        });
        $A.enqueueAction(action);
	},
	loadEvents : function(cmp,evt,hlp) {        

        var appEvent = $A.get("e.c:CalendarLoadEvent");
        appEvent.setParams({"message":"CalendarLoaded"});
        appEvent.fire();
        /*$('.row1').draggable({
            appendTo :"body",
            helper: "clone",
            zIndex: 10000,
            start: function( event, ui ) {console.log("Drag Start")},
            create: function( event, ui ) {console.log("Drag Created")}
        });*/
		// https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/ref_aura_valueChange.htm<aura:registerEvent name="sampleComponentEvent" type="c:compEvent"/>

		// events = [
		// 	{
		// 		title: 'All Day Event',
		// 		start: '2017-03-01'
		// 	},
		// 	{
		// 		title: 'Long Event',
		// 		start: '2017-03-07',
		// 		end: '2017-03-10'
		// 	},
		// 	{
		// 		id: 999,
		// 		title: 'Repeating Event',
		// 		start: '2017-03-09T16:00:00'
		// 	},
		// 	{
		// 		id: 999,
		// 		title: 'Repeating Event',
		// 		start: '2017-03-16T16:00:00'
		// 	},
		// 	{
		// 		title: 'Conference',
		// 		start: '2017-03-11',
		// 		end: '2017-03-13'
		// 	},
		// 	{
		// 		title: 'Meeting',
		// 		start: '2017-03-12T10:30:00',
		// 		end: '2017-03-12T12:30:00'
		// 	},
		// 	{
		// 		title: 'Lunch',
		// 		start: '2017-03-12T12:00:00'
		// 	},
		// 	{
		// 		title: 'Meeting',
		// 		start: '2017-03-12T14:30:00'
		// 	},
		// 	{
		// 		title: 'Happy Hour',
		// 		start: '2017-03-12T17:30:00'
		// 	},
		// 	{
		// 		title: 'Dinner',
		// 		start: '2017-03-12T20:00:00'
		// 	},
		// 	{
		// 		title: 'Birthday Party',
		// 		start: '2017-03-13T07:00:00'
		// 	},
		// 	{
		// 		title: 'Click for Google',
		// 		url: 'http://google.com/',
		// 		start: '2017-03-28'
		// 	}
		// ];
		var events = cmp.get('v.events');
		//console.log('loadEvents');
		$('#calendar').fullCalendar('addEventSource',events);
		hlp.modifyCalendarDOM();        
	},
    onRender: function(cmp, evt, hlp){

    },
	jsLoaded : function(cmp, evt, hlp) {

			$('#calendar').fullCalendar({
				header: false,
				// header: {
				// 	left: 'prev,next,today',
				// 	center: 'title',
				// 	right: 'month,basicWeek,listWeek,basicDay,listDay'
				// },
				// customize the button names,
				// otherwise they'd all just say "list"
				// views: {
				// 	listDay: { buttonText: 'list day' },
				// 	listWeek: { buttonText: 'list week' }
				// },
				// defaultView: 'listWeek',
				// defaultDate: '2017-03-12',
				navLinks: true, // can click day/week names to navigate views
				editable: true,
				droppable: true, // allows things to be dropped onto the calendar
				selectable: true,
				selectHelper: true,
				eventLimit: true, // allow "more" link when too many events
				events: [],
				// Callbacks
				select: function(start, end) {
                    /*var startDate = start.year()+"-"+(start.month()+1)+"-"+start.date()+"T00:00:00.000Z";
					var endDate = end.year()+"-"+(end.month()+1)+"-"+(end.date()-1)+"T00:00:00.000Z";
                    var createRecordEvent = $A.get("e.force:createRecord");
                    createRecordEvent.setParams({
                        "entityApiName": "Event",
                        "navigationLocation": "LOOKUP",
                        "defaultFieldValues": {
                            StartDateTime: startDate,
                            EndDateTime: endDate,
                            ActivityDateTime: startDate,
                            DurationInMinutes: 1440,
                            IsAllDayEvent: true
                        },
                        "panelOnCreateCallback":function(evt){
                            //console.log("EventCreated");
                        }
                      });
                    createRecordEvent.fire();*/
					//$('#calendar').fullCalendar('unselect');
				},
				dayClick: function(date,jsEvent,ui,resourceObj) {
				    console.log('a day has been clicked!');
                    cmp.set('v.dayClick','true');
					$A.enqueueAction(cmp.get('c.listDay'));
					//hlp.createEvent(cmp,hlp,date);
					var headerDate = date.format('MMMM')+" "+date.date()+", " + date.year();
					cmp.set('v.headerDate',headerDate);
                    $('#calendar').fullCalendar('gotoDate', date);
				},
				drop: function(date,jsEvent,ui,resourceId) {
					//console.log('an event has been dropped!');
					//hlp.helperMethod();
                    
                    //console.log(date);
                    //console.log(jsEvent);
                    //console.log(ui);
					//console.log(resourceId);
                    //console.log(ui.helper.context.getAttribute('id'));
                    var startDate = date.year()+"-"+(date.month()+1)+"-"+date.date()+"T00:00:00.000Z";
					var endDate = date.year()+"-"+(date.month()+1)+"-"+(date.date())+"T00:00:00.000Z";
                    //console.log(startDate);
                    var createRecordEvent = $A.get("e.force:createRecord");
                    createRecordEvent.setParams({
                        "entityApiName": "Event",
                        "navigationLocation": "LOOKUP",
                        "defaultFieldValues": {
                            StartDateTime: startDate,
                            EndDateTime: endDate,
                            ActivityDateTime: startDate,
                            DurationInMinutes: 1440,
                            IsAllDayEvent: true,
                            WhoId:ui.helper.context.getAttribute('id')
                        },
                        "panelOnCreateCallback":function(evt){
                            //console.log("Event Creation");
                            //console.log(evt);
                        },
                        "panelOnDestroyCallback":function(evt){
                            //console.log("Event Modal closed");
                            //console.log(arguments);
                        }
                      });
                    createRecordEvent.fire();
				},
				eventClick: function(calEvent, jsEvent, view) {
					if(cmp.get('v.view')!="listDay")
                    {
                        var editRecordEvent = $A.get("e.force:editRecord");
                        editRecordEvent.setParams({
                            "recordId": calEvent.sfid//,
                            //"navigationLocation": "DETAIL"
                          });
                        editRecordEvent.fire();
                    }
                    else
                    {
                        var location = "";
                        var latitude = "";
                        var longitude = "";
                        for(var index in calEvent.source.origArray)
                        {
                            if(calEvent.source.origArray[index]["Id"] == calEvent.url.split('/')[1])
                            {
                                location = calEvent.source.origArray[index]["Location"];
                            }
                        }
                        var mapOptionsCenter = {"lat":"", "lng":""};
                        var mapData = Array(); 
                        cmp.set("v.showMaps", true);
                        var childComponent = cmp.find("gMaps");
                        childComponent.loadGoogleMaps(mapOptionsCenter, mapData, location);                        
                        /*var location = "";
                        for(var index in calEvent.source.origArray)
                        {
                            if(calEvent.source.origArray[index].Id == calEvent.sfid)
                            {
                                location = calEvent.source.origArray[index].Location;
                                 $("#gmaps iframe").attr("src","https://www.google.com/maps/embed/v1/place?q="+location+"&key=AIzaSyDBBRWOn_l94O3FvU7dfPfQVN0vLHBRIrI");
                                break;
                            }
                        }*/
                    }
                    return false;
			    },
                eventMouseover: function(calEvent, jsEvent, view){
                    var a = $(this).parents('.fc-row.fc-week').index()+1;
                    var b = $(this).parents('.fc-event-container').index()+1;
                    var c = $(this).parents('tr').index()+1;
                    var d = ".fc-row.fc-week.fc-widget-content.fc-rigid:nth-child("+a+") .fc-content-skeleton tbody tr:nth-child("+c+") td:nth-child("+b+")";
                    //console.log(d);
                    /*cmp.find('overlayLib').showCustomPopover({
                        body: 'Show Event Details',
                        referenceSelector: d
                    });*/
                },
				eventDataTransform: function(event) {
					// https://fullcalendar.io/docs/event_data/Event_Object/
					var evt;
					// Salesforce Event
					if (event.Id) {
						evt = hlp.sObjectToEvent(event);
					}
					// Regular Event
					else {
						evt = event;
					}
					//console.log('eventDataTransform:output',evt);
					return evt;
				},
				eventDrop: function(event, delta, revertFunc) {
			        console.log(event.title + " was dropped on " + event.start.format());
			        if (!confirm("Are you sure about this change?")) {
			            revertFunc();
			        } else {
						var sObject = hlp.eventToSObject(event);
						hlp.updateEvents(cmp,[sObject]);
					}
			    },
				eventResize: function(event, delta, revertFunc) {
			        //console.log(event.title + " end is now " + event.end.format());
			        if (!confirm("is this okay?")) {
			            revertFunc();
			        } else {
						var sObject = hlp.eventToSObject(event);
						hlp.updateEvents(cmp,[sObject]);
					}
			    },
				eventReceive: function(event) {
					//console.log('event received',event);
					var sObject = hlp.eventToSObject(event);
					sObject.WhatId = sObject.Id;
					sObject.Id = null;
					hlp.updateEvents(cmp,[sObject]);
					// hlp.getEvents(cmp,[event.sfid]);
				}
			});

			$("#calendar").fullCalendar('addEventSource',cmp.get('v.events'));
			hlp.setCalendarDate(cmp);
			hlp.getEvents(cmp);
		//});
	},
    checkGeoLocation : function(component, event, helper) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                var action = component.get("c.getCityName");
                action.setParams({
                    "latitude": lat,
                    "longitude": lon
                });
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        var location = response.getReturnValue();
                    }
                });
                $A.enqueueAction(action);
            });
        } else {
            console.log('Your browser does not support GeoLocation');
        }
	}
})