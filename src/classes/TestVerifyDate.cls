@isTest
public class TestVerifyDate {
    @isTest static void equalCheck(){
        Date test = VerifyDate.CheckDates(system.today(), system.today());
        Integer totalDays = Date.daysInMonth(system.today().year(), system.today().month());
        Date lastDay = Date.newInstance(system.today().year(), system.today().month(), totalDays);
        System.assertEquals(system.today(), test);
    }
    @isTest static void Date2Check(){
        Date test = VerifyDate.CheckDates(system.today(),system.today().addDays(30));
        Integer totalDays = Date.daysInMonth(system.today().year(), system.today().month());
        Date lastDay = Date.newInstance(system.today().year(), system.today().month(), totalDays);
        System.assertEquals(system.today(), test);
    }
     @isTest static void Date1Check(){
        Date test = VerifyDate.CheckDates(system.today().addDays(30),system.today());
         Integer totalDays = Date.daysInMonth(system.today().year(), system.today().month());
        Date lastDay = Date.newInstance(system.today().year(), system.today().month(), totalDays);
        System.assertEquals(lastDay, test);
    }
     @isTest static void Date1NegCheck(){
        Date test = VerifyDate.CheckDates(system.today().addDays(-10),system.today());
         Integer totalDays = Date.daysInMonth(system.today().year(), system.today().month());
        Date lastDay = Date.newInstance(system.today().year(), system.today().month(), totalDays);
        System.assertEquals(system.today(), test);
    }
    @isTest static void Date2NegCheck(){
        Date test = VerifyDate.CheckDates(system.today(),system.today().addDays(-10));
        Integer totalDays = Date.daysInMonth(system.today().year(), system.today().month());
        Date lastDay = Date.newInstance(system.today().year(), system.today().month(), totalDays);
        System.assertEquals(lastDay, test);
    }
    @isTest static void Date12NegCheck(){
        Date test = VerifyDate.CheckDates(system.today().addDays(-10),system.today().addDays(-10));
        Integer totalDays = Date.daysInMonth(system.today().year(), system.today().month());
        Date lastDay = Date.newInstance(system.today().year(), system.today().month(), totalDays);
        System.assertEquals(system.today().addDays(-10), test);
    }
    @isTest static void Date12Check(){
        Date test = VerifyDate.CheckDates(system.today().addDays(10),system.today().addDays(20));
        Integer totalDays = Date.daysInMonth(system.today().year(), system.today().month());
        Date lastDay = Date.newInstance(system.today().year(), system.today().month(), totalDays);
        System.assertEquals(system.today().addDays(20), test);
    }
    @isTest static void Date12SuperCheck(){
        Date test = VerifyDate.CheckDates(system.today().addDays(10),system.today().addDays(365));
        Integer totalDays = Date.daysInMonth(system.today().year(), system.today().month());
        Date lastDay = Date.newInstance(system.today().year(), system.today().month(), totalDays);
        System.assertEquals(lastDay, test);
    }
}