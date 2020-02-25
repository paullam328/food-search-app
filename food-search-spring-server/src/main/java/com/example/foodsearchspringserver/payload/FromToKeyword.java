package com.example.foodsearchspringserver.payload;

public class FromToKeyword {
    String ChangeFromKeyword;
    String ChangeToKeyword;

    public String getFromKeyword() {
        return ChangeFromKeyword;
    }

    public void setFromKeyword(String fromKeyword) {
        this.ChangeFromKeyword = fromKeyword;
    }

    public String getToKeyword() {
        return ChangeToKeyword;
    }

    public void setToKeyword(String toKeyword) {
        this.ChangeToKeyword = toKeyword;
    }
}
