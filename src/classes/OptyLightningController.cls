public with sharing class OptyLightningController {

	public enum OptyScope {
		mine,
		Delegated,
		My_Territory,
		My_Team_Territory,
		Team,
		Everything
	}
     @AuraEnabled
    public static Admin_Setup__c getAdminSetup(){
        Admin_Setup__c adminSetup = Admin_Setup__c.getInstance(userinfo.getProfileId());
        return adminSetup;
    }
	 @ AuraEnabled
		public static List < Opportunity > getOptyList(string ScopeName, Integer LimitRecords, string FieldsString, string ObjecttoQuery) {
		List < sObject > sobjList = Database.query('SELECT ' + FieldsString + ' FROM ' + ObjecttoQuery + ' USING SCOPE ' + ScopeName + ' ORDER BY LastModifiedDate DESC LIMIT ' + LimitRecords);
		system.debug(sobjList);
		return sobjList;
	}
	@ AuraEnabled
	public static string getRecordsString(string FieldsString, string ObjecttoQuery, string QueryString, string FieldtoQuery) {
		string sobjList = JSON.serialize(Database.query('SELECT ' + FieldsString + ' FROM ' + ObjecttoQuery + ' where ' + FieldtoQuery + ' = :QueryString'));
		system.debug(sobjList);
		return sobjList;
	}

	public static List < sObject > getListOfRecords(string ScopeName, Integer LimitRecords, string FieldsString, string ObjecttoQuery) {
		if (String.isNotBlank(ObjecttoQuery) && ObjecttoQuery == 'Account') {
			return null;
		} else {
			return getOptyList(ScopeName, LimitRecords, FieldsString, ObjecttoQuery);
		}
	}

	 @ AuraEnabled
	public static Opportunity saveOpty(Opportunity Oppty) {
		// Perform isUpdatable() checking first, then
		upsert Oppty;
		return Oppty;
	}

	 @ AuraEnabled
	public static String sessionId() {
		return UserInfo.getSessionId();
	}

	 @ AuraEnabled
	public static string CreateFavorite(string FavoriteList) {
		//Make sure your Salesforce instance URL is added in remote site settings
		String sfdcURL = URL.getSalesforceBaseUrl().toExternalForm();
		//String restAPIURL = 'https://myplayground073-dev-ed.my.salesforce.com/services/data/v43.0/ui-api/favorites';
		String restAPIURL = 'callout:OppAppFavorites/services/data/v43.0/ui-api/favorites';
		system.debug(sfdcURL);
		String sessionId1 = sessionId();
		HttpRequest httpRequest = new HttpRequest();
		httpRequest.setBody(FavoriteList);
		httpRequest.setMethod('POST');
		httpRequest.setHeader('Content-Type', 'application/json;charset=UTF-8');
		//httpRequest.setHeader('Authorization', 'OAuth '+sessionId1);
		httpRequest.setEndpoint(restAPIURL);
		String response = '';
		//system.debug(sessionId);
		try {
			Http http = new Http();
			HttpResponse httpResponse = http.send(httpRequest);
			system.debug(httpResponse.getStatusCode());
			if (httpResponse.getStatusCode() == 201) {
				//response = JSON.serializePretty(JSON.deserializeUntyped(httpResponse.getBody()));
				response = 'FavoriteCreated';
			} else {
				system.debug('httpResponse');
				System.debug(httpResponse.getHeader('Location'));
				HttpRequest httpRequest1 = new HttpRequest();
				httpRequest1.setEndpoint(restAPIURL);
				httpRequest1.setBody(FavoriteList);
				httpRequest1.setMethod('POST');
				httpRequest1.setHeader('Content-Type', 'application/json;charset=UTF-8');
				//httpRequest1.setHeader('Authorization', 'OAuth '+sessionId1);
				httpResponse = http.send(httpRequest1);
				if (httpResponse.getStatusCode() == 201) {
					//response = JSON.serializePretty(JSON.deserializeUntyped(httpResponse.getBody()));
					response = 'FavoriteCreated';
				} else {
					System.debug(' httpResponse ');
					system.debug(httpResponse.getHeader('Location'));
					//throw new CalloutException(httpRequest1.getBody());
				}
				//throw new CalloutException(httpRequest.getBody());
			}
		} catch (System.Exception e) {
			System.debug('ERROR: ' + e);
			throw e;
		}
		System.debug(' ** response ** : ' + response);
		return response;
	}
	 @ AuraEnabled
	public static string getFavorites() {
		//Make sure your Salesforce instance URL is added in remote site settings
		String sfdcURL = URL.getSalesforceBaseUrl().toExternalForm();
		//String restAPIURL = 'https://myplayground073-dev-ed.my.salesforce.com/services/data/v43.0/ui-api/favorites';
		String restAPIURL = 'callout:OppAppFavorites/services/data/v43.0/ui-api/favorites';
		system.debug(sfdcURL);
		String sessionId1 = sessionId();
		HttpRequest httpRequest = new HttpRequest();

		httpRequest.setMethod('GET');
		httpRequest.setHeader('Content-Type', 'application/json;charset=UTF-8');
		//httpRequest.setHeader('Authorization', 'OAuth '+sessionId1);
		httpRequest.setEndpoint(restAPIURL);
		String response = '';
		//system.debug(sessionId);
		try {
			Http http = new Http();
			HttpResponse httpResponse = http.send(httpRequest);
			system.debug(httpResponse.getStatusCode());
			if (httpResponse.getStatusCode() == 200) {
				//response = JSON.serializePretty(JSON.deserializeUntyped(httpResponse.getBody()));
				response = httpResponse.getBody();
			} else if (httpResponse.getStatusCode() == 302) {
				system.debug('httpResponse');
				System.debug(httpResponse.getHeader('Location'));
				HttpRequest httpRequest1 = new HttpRequest();
				httpRequest1.setEndpoint(restAPIURL);

				httpRequest1.setMethod('GET');
				httpRequest1.setHeader('Content-Type', 'application/json;charset=UTF-8');
				//httpRequest1.setHeader('Authorization', 'OAuth '+sessionId1);
				httpResponse = http.send(httpRequest1);
				if (httpResponse.getStatusCode() == 200) {
					//response = JSON.serializePretty(JSON.deserializeUntyped(httpResponse.getBody()));
					response = httpResponse.getBody();
				} else {
					System.debug(' httpResponse ');
					system.debug(httpResponse.getHeader('Location'));
					//throw new CalloutException(httpRequest1.getBody());
				}
				//throw new CalloutException(httpRequest.getBody());
			}
		} catch (System.Exception e) {
			System.debug('ERROR: ' + e);
			throw e;
		}
		System.debug(' ** response ** : ' + response);
		return response;
	}
	 @ AuraEnabled
	public static string DeleteFavorite(string target) {
		//Make sure your Salesforce instance URL is added in remote site settings
		String sfdcURL = URL.getSalesforceBaseUrl().toExternalForm();
		//String restAPIURL = 'https://myplayground073-dev-ed.my.salesforce.com/services/data/v43.0/ui-api/favorites';
		String restAPIURL = 'callout:OppAppFavorites/services/data/v41.0/ui-api/favorites/' + target;
		system.debug(restAPIURL);
		String sessionId1 = sessionId();
		HttpRequest httpRequest = new HttpRequest();

		httpRequest.setMethod('DELETE');
		httpRequest.setHeader('Content-Type', 'application/json;charset=UTF-8');
		//httpRequest.setHeader('Authorization', 'OAuth '+sessionId1);
		httpRequest.setEndpoint(restAPIURL);
		String response = '';
		//system.debug(sessionId);
		try {
			Http http = new Http();
			HttpResponse httpResponse = http.send(httpRequest);
			system.debug(httpResponse);
			system.debug(httpResponse.getStatusCode());
			if (httpResponse.getStatusCode() == 200) {
				//response = JSON.serializePretty(JSON.deserializeUntyped(httpResponse.getBody()));
				response = httpResponse.getBody();
			} else if (httpResponse.getStatusCode() == 302) {
				system.debug('httpResponse');
				System.debug(httpResponse.getHeader('Location'));
				HttpRequest httpRequest1 = new HttpRequest();
				httpRequest1.setEndpoint(restAPIURL);

				httpRequest1.setMethod('DELETE');
				httpRequest1.setHeader('Content-Type', 'application/json;charset=UTF-8');
				//httpRequest1.setHeader('Authorization', 'OAuth '+sessionId1);
				httpResponse = http.send(httpRequest1);
				if (httpResponse.getStatusCode() == 200) {
					//response = JSON.serializePretty(JSON.deserializeUntyped(httpResponse.getBody()));
					response = httpResponse.getBody();
				} else {
					System.debug(' httpResponse ');
					system.debug(httpResponse.getHeader('Location'));
					//throw new CalloutException(httpRequest1.getBody());
				}
				//throw new CalloutException(httpRequest.getBody());
			}
		} catch (System.Exception e) {
			System.debug('ERROR: ' + e);
			throw e;
		}
		System.debug(' ** response ** : ' + response);
		return response;
	}

	 @ AuraEnabled
	public static string getOptyFields() {
		//Make sure your Salesforce instance URL is added in remote site settings
		String sfdcURL = URL.getSalesforceBaseUrl().toExternalForm();
		//String restAPIURL = 'https://myplayground073-dev-ed.my.salesforce.com/services/data/v43.0/ui-api/favorites';
		string FieldsList = 'Type,Name';
		String restAPIURL = 'callout:OppAppFavorites/services/data/v43.0/sobjects/Account/0017F00000tPkxIQAS?fields=' + FieldsList;
		system.debug(sfdcURL);
		String sessionId1 = sessionId();
		HttpRequest httpRequest = new HttpRequest();

		httpRequest.setMethod('GET');
		httpRequest.setHeader('Content-Type', 'application/json;charset=UTF-8');
		//httpRequest.setHeader('Authorization', 'OAuth '+sessionId1);
		httpRequest.setEndpoint(restAPIURL);
		String response = '';
		//system.debug(sessionId);
		try {
			Http http = new Http();
			HttpResponse httpResponse = http.send(httpRequest);
			system.debug(httpResponse.getStatusCode());
			if (httpResponse.getStatusCode() == 200) {
				//response = JSON.serializePretty(JSON.deserializeUntyped(httpResponse.getBody()));
				response = httpResponse.getBody();
			} else if (httpResponse.getStatusCode() == 302) {
				system.debug('httpResponse');
				System.debug(httpResponse.getHeader('Location'));
				HttpRequest httpRequest1 = new HttpRequest();
				httpRequest1.setEndpoint(restAPIURL);

				httpRequest1.setMethod('GET');
				httpRequest1.setHeader('Content-Type', 'application/json;charset=UTF-8');
				//httpRequest1.setHeader('Authorization', 'OAuth '+sessionId1);
				httpResponse = http.send(httpRequest1);
				if (httpResponse.getStatusCode() == 200) {
					//response = JSON.serializePretty(JSON.deserializeUntyped(httpResponse.getBody()));
					response = httpResponse.getBody();
				} else {
					System.debug(' httpResponse ');
					system.debug(httpResponse.getHeader('Location'));
					//throw new CalloutException(httpRequest1.getBody());
				}
				//throw new CalloutException(httpRequest.getBody());
			}
		} catch (System.Exception e) {
			System.debug('ERROR: ' + e);
			throw e;
		}
		System.debug(' ** response ** : ' + response);
		return response;
	}

	 @ AuraEnabled
	public static string SyncData(string RecordId, string targetURL, string datatosync, string ListsToSync) {
		//Make sure your Salesforce instance URL is added in remote site settings
		list < string > RelatedListData = (list < string > )JSON.deserialize(ListsToSync, list < string > .class);
		string tempListData = '';
		list < string > tempObjectName = new list < string > ();
		for (integer i = 0; i < RelatedListData.size(); i++) {
			string tempList = RelatedListData.get(i);
			tempObjectName = tempList.split(':', 2);
			tempListData += getRecordsString('Id', tempObjectName.get(0), RecordId, tempObjectName.get(1));
		}
		system.debug(tempListData);
		if (tempListData != '') {
			datatosync += '&' + tempListData;
		}

		//String restAPIURL = 'https://myplayground073-dev-ed.my.salesforce.com/services/data/v43.0/ui-api/favorites';
		String restAPIURL = targetURL;

		HttpRequest httpRequest = new HttpRequest();
		httpRequest.setBody(datatosync);
		httpRequest.setMethod('POST');
		httpRequest.setHeader('Content-Type', 'application/json;charset=UTF-8');
		//httpRequest.setHeader('Authorization', 'OAuth '+sessionId1);
		httpRequest.setEndpoint(restAPIURL);
		String response = '';
		//system.debug(sessionId);
		try {
			Http http = new Http();
			HttpResponse httpResponse = http.send(httpRequest);
			system.debug(httpResponse.getStatusCode());
			if (httpResponse.getStatusCode() == 200) {
				//response = JSON.serializePretty(JSON.deserializeUntyped(httpResponse.getBody()));
				response = 'FavoriteCreated';
			}
		} catch (System.Exception e) {
			System.debug('ERROR: ' + e);
			throw e;
		}
		System.debug(' ** response ** : ' + response);
		return response;
	}
	public class Pair {
		public String key {
			get;
			set;
		}
		public String val {
			get;
			set;
		}
	}
	 @ AuraEnabled
	public static List < string > getFieldsList(string ObjectName) {
		list < string > fieldList = new list < string > ();
		Map < String,
		Schema.SObjectField > fieldMap = Schema.getGlobalDescribe().get('Opportunity').getDescribe().fields.getMap();
		for (Schema.SObjectField sfield: fieldMap.Values()) {
			schema.describefieldresult dfield = sfield.getDescribe();
			if (dfield.isAccessible()) {
				fieldList.add(dfield.getLabel());
			}
		}
		system.debug(fieldList);
		return fieldList;
	}
	 @ AuraEnabled
	public static map < string,
	string > getFieldsListMap(string ObjectName) {
		list < string > fieldList = new list < string > ();
		list < string > fieldNamesList = new list < string > ();
		Map < String,
		Schema.SObjectField > fieldMap = Schema.getGlobalDescribe().get('Opportunity').getDescribe().fields.getMap();
		Map < String,
		string > finalresult = new Map < String,
		string > ();
		for (Schema.SObjectField sfield: fieldMap.Values()) {
			schema.describefieldresult dfield = sfield.getDescribe();
			if (dfield.isAccessible()) {
				fieldList.add(dfield.getLabel());
				fieldNamesList.add(dfield.getName());
				finalresult.put(dfield.getName(), dfield.getLabel());
			}
		}

		system.debug(fieldList);
		system.debug(finalresult);
		return finalresult;
	}
    
	  @ AuraEnabled
        public static list<string> getChildRelationShipList(string ObjName,list<string> RelatedListNames){
    
            
            // sObject types to describe
            system.debug(RelatedListNames);
            String[] types = new String[]{ObjName};
            Schema.DescribeSobjectResult[] R = Schema.describeSObjects(types);
            Schema.DescribeSobjectResult[] RelatedObjects = Schema.describeSObjects(RelatedListNames);
            List<Schema.ChildRelationship> C = new List<Schema.ChildRelationship>();
            
            if(RelatedListNames.isEmpty()){
                RelatedListNames = new list<string>();
                RelatedListNames.add('OpportunityLineItem');
            }
            
            for(Schema.DescribeSobjectResult res : R) {
                C = res.getChildRelationships();
            }
            list<string> serializedList = new list<string>();
            for (Schema.ChildRelationship test : C){
                for(Schema.DescribeSobjectResult RelatedList : RelatedObjects)
                {
                    if(test.getChildSObject() == RelatedList.getSObjectType())
                    {
                        serializedList.add(JSON.serialize(test));
                        system.debug(JSON.serialize(test));   
                    }                    
                }
                 
            }
            system.debug(serializedList);
            return serializedList;
        }
	/* @ AuraEnabled
	public static OppListSettings__c getOptyListSettings(){
	OppListSettings__c Settings = OppListSettings__c.getInstance(userinfo.getProfileId());

	return Settings;
	}*/
}