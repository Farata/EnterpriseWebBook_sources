package com.enterprisewebbook.ch8.websockets.util;

/**
 * TODO
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 12/14/12
 */
public class TimeUtil {

    private static final long MILISECONDS_IN_SECOND = 1000;
    private static final long MILISECONDS_IN_MINUTE = MILISECONDS_IN_SECOND * 60;
    private static final long MILISECONDS_IN_HOUR = MILISECONDS_IN_MINUTE * 60;
    private static final long MILISECONDS_IN_DAY = MILISECONDS_IN_HOUR * 24;

    public static String convertTimeDiffToString(long timeDiff) {

        long days = timeDiff / MILISECONDS_IN_DAY;
        long rest = timeDiff % MILISECONDS_IN_DAY;

        long hours = rest / MILISECONDS_IN_HOUR;
        rest = rest % MILISECONDS_IN_HOUR;

        long minutes = rest / MILISECONDS_IN_MINUTE;
        rest = rest % MILISECONDS_IN_MINUTE;

        long seconds = rest / MILISECONDS_IN_SECOND;
        return "" + days + ":" + hours + ":" + minutes + ":" + seconds;
    }
}
