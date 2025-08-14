package com.anil.projects.findyourcollege3.Util;

import java.io.FilterReader;
import java.io.IOException;
import java.io.Reader;

public class BOMStripper extends FilterReader {
    private boolean isFirst = true;

    public BOMStripper(Reader in) {
        super(in);
    }

    @Override
    public int read(char[] cbuf, int off, int len) throws IOException {
        int n = super.read(cbuf, off, len);
        if (isFirst && n > 0) {
            if (cbuf[0] == '\uFEFF') { // BOM character
                System.arraycopy(cbuf, 1, cbuf, 0, n - 1);
                n--;
            }
            isFirst = false;
        }
        return n;
    }
}
