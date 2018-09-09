public class StringArrayTest {

    public static list<string> generateStringArray(Integer len){
        list<string> StrngList = new list<string>();
            for(Integer x = 0;x<len;x++ ){
                StrngList.add('Test '+x);
            }
        return (StrngList);
    }
}