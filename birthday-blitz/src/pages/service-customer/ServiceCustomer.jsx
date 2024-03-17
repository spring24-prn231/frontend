import React, { useEffect, useState } from 'react';
import './ServiceCustomer.css'
import '../common/customer-css/bootstrap.min.css'
import menu_img from '../../assets/menu/menu.jpg'
import { CheckBox } from '@mui/icons-material';
import { element } from 'prop-types';
const ServiceCustomer = () => {
    var mockData = [
        {
            "name": "AA",
            "price": "40004",
            "content": "Dit me thang Loc",
            "image": "https://genex.com.vn/wp-content/uploads/2023/03/Coc-tru-thuc-an-cho-be-FB0010N-3-200x200.jpg"
        },
        {
            "name": "BB",
            "price": "232323",
            "content": "Dit me may Loc oi Dit me may Loc oi \
            Dit me may Loc oi Dit me may Loc oi Dit me may Loc oi Dit me may Loc oi Dit me may Loc oi Dit me may Loc oi \
            Dit me may Loc oi ",
            "image": "https://product.hstatic.net/1000217401/product/beautypro_cat1_1_c1b6e3c712a645efbabc19c802fa8cfa.png"
        },
        {
            "name": "CC",
            "price": "98765432",
            "content": "98765432 98765432 98765432 98765432 98765432 ",
            "image": "https://genex.com.vn/wp-content/uploads/2023/03/Coc-tru-thuc-an-cho-be-FB0010N-3-200x200.jpg"
        }

    ];

    var mockData2 = [
        {
            "name": "CCCCCC",
            "price": "5000",
            "content": "Đoàn quân Việt Nam  <br></br> đi chung lòng cứu </br>quốc, bước chân dồn vang trên đường <br/>gập ghềnh xa, cờ in máu chiến thắng mang hồn nước, súng ngoài xa chen khúc quân hành ca, đường vinh quang xây xác quân thù, thắng gian lao cùng nhau lập chiến khu, vì nhân dân chiến đấu không ngừng, tiến mau ra sa trường. Tiến lên, cùng tiến lên, nước non Việt Nam ta vững bền.",
            "image": "https://cdn.tgdd.vn/2020/08/content/cach-chen-nhac-va-loi-bai-hat-lyric-vao-anh-tren-dien-thoaia-13-490x1020.jpg"
        },
        {
            "name": "AAAAAAAAAAAAAA",
            "price": "232323",
            "content": "Đi dọc Việt Nam theo bánh con tàu quay \
            Qua đèo Hải Vân mây bay đỉnh núi\
            Nhớ khi xưa qua đèo qua suối\
            Mà lòng ta mơ, tàu qua núi cao\
            Ngày hôm nay thênh thang con đường lớn\
            Tàu anh đi trong yêu thương chào đón\
            Xao xuyến bao niềm vui, tha thiết con tàu đi\
            Là thương nhau, em bắt cầu cho tàu anh tới\
            Là yêu nhau, mấy suối em cũng lội\
            Là yêu nhau, mấy núi em cũng trèo ",
            "image": "https://dichthuatproling.com/images/2017/10/dich-thuat-loi-bai-hat-sang-tieng-viet-va-ra-tieng-nuoc-ngoai-2.jpg"
        },
        {
            "name": "DDDDDDDDDDDDDDDD",
            "price": "98765432",
            "content": "Love in your eyes <br></br>\
            Sitting silent by my side </br>\
            Going on Holding hand\
            Walking through the nights\
            Hold me up Hold me tight\
            Lift me up to touch the sky\
            Teaching me to love with heart\
            Helping me open my mind",
            "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAB9VBMVEX9/f3AeB7///////3ZsYi9bwC+cwvt3Mu9cQDAdg3twVQAAADw4tS/dRb/AADq1sHLkVLjyK/RoG6RkZHExMTvxVmIiIjf399PT0/19fWpqamXl5fs7OyhoaHV1dXntUbLy8u3t7fa2trm5uYXAAAgAAANAACwsLAsAAAmAAC8vLykpKS5ZgAaAACAgIDHgSLFhDUqAABbW1s3AABpaWl1dXXVqH717OPZnTHQjym0ZxXpuUs9Y//ux3A3Nzf79vDj5/3+wsKfrv796elYdv+jVg5EEABUGwC5bxepWgDTm1PfvpzJi0Rthv/w8/20wP7d4v3Fzv6Ro/5Lbf9hKAlwLwWIPAc8AADdpDM8EADnumRBQUEoKCjN1P7/RER8kv/+pqb/KSn+kZH+aWn/VVX92Nj+gICDOgp0TEWZSwy7f0sZGRlPEQDPmmGbq/7/YmL+ysr/IiL+oaH+iIiAlf+zVQB/QxWrZiFIAACMW0WNSxVnIQClTRJZGgB3LAAzDgOpdUzz2JX347TOiQfiuXvVn0ise17Muq92SUFbP0GvZUfPWB2WaVtxJ0S6ks4UO7uXOKriPWBVQC9vY+W+PY/XgqrsydeSZs8AGxspVv/fGBjVIGDkgJvfssyYh3eiiM3JwdbnRRmXXSFtOBZYAACPMADOsJ+2+zajAAAgAElEQVR4nO19iX8aV55n8QAJBWGEIGBOc5+S0GkJ7JgknapClpyjXYVdsdNJH2mCg3om3WlhgwD3JOmOM72zs9uzsz2zu72zVu/+nfv7vaqCAqokkJ2J7c/8bBAU9Y7v+53vLKbWaNREQRA4scGWgVigmiDWavV6rdeVJInr9ur1uogEl+B2JFZL8B1uF7m+1O2IIi/U65hVQ2xUiyWgvT34T6lUWmhwG324o+xosMWSfP2uSnt7g/tKJVO50atDVXo1rBbb6zT28U+tXK6aikAmfC/JNEhIc3GIudXVbL1YavESL1aZrih2BL7LS01RqT7UttsBTEJH4PrdOr0IAIRut9PpjOCEW5HqPbHX64k8NBIA60JmYsPhaHTaxREACKHIdsTaSaNRNikI5SpijYsmRxWw4Et+b3QEsdNjEZCp2q6XARCkKo3kqNIVTSFVfjW5KjVMxZYIXKsygih2eZ4XuG6toXCEbYg1lm2LAs81a/vlKlC5vK8yC5jblvmoMlOBW+/WoGZ1LpdLZUW2ykLutLGLKiGEWqcOd4oNZFC16gCqQiL8NMaXUrFa57uAiyIqlRtF+FtqlEtjHB80EaTG5I5yjctmuQ7UrNYFhPtMjTIIhEs8oUJaqzdOGj0AxsJ1oUNlRKX9fQUO/BkTU6BeswdXe/1kOp3CAtj9solScUimRp2VZa3WMMniNSZnqrQBv+t3BGA0vafI1oCHxXIdGtEELSVzeh9qBLKL7YNsqDqgeYomtlNvtbBQFgSgWgSECKVH9RDqKjY5oQ5wqQyKPN8ZaJ4MkiJCMQIyDQnZ3OiA8FVrEgDkGw7KjD0N3cXaAy+qRRY4UWT3S6MCPOCHIrVVtnOng8Vi3vs12maNrkgFA0AWtSo4lNYrd/eKkD1toyroMFtm0KZ0OKmf4usoac2NDQ6+iZRPbZFHo0HbR+GEliWlESru16HFiyzP8SJr0hSthQkIgX3wM1gaU1FBQ5uIiohMyByE1eugEso3tWomND+1xqBdAMwVPbqLCEu0LIHjOz2UUlFKJZMpAWSWbfD9PtdPSXXEBXUB21HVotFAK2qRYps38OZqG+wwaKBjyF8HSpUsRlXgRUfsYUm9HmUPLaZcxXuUxhtwplTeR92jVmTPxBZRHRvsHmK7orxpm28g82VQgqosBFyzU2Ma+yfiRhokS6RWWehvSBs5Hk0zfKuLih7K9atiM7PYyLK0UmVTCBqqiZyvd4Ht2D4Ia0QJsSEcba7ZoNaxoeqhRo5HrSNo34BhKN1wd7FWc5T0SJMBSKmsvaVivdPtNJCHAiLMCahwdS61IfUlQfERcEeNKqIiPPS9rHAE1BttoVz9BQfqYdWxwPb2F0ZVUFvvvf1uzYGXSvujeqi1j3KdS8WV/fJcUTWsZepciws0Z62HmBDTPZaV9bDYaLQaVdBD0DbQvCyPbq7eBS0SKT4WhfbxA6AloJvG9CHSN9/cfPDoAXx78HhJvqJL3+BN38CHmw/kvzSlAS1B0Tp5vTFOr117bUjXAGGtbEIuFllQyBJDTVSthiKGQUOjrZgvh8NUdBySl4HeeG0U4dOHza5Yb7NsHdx+iVFCtVq3vY9yh0I4sBELS4R58UlG+DqQDPEum02tpjaykrQFAllnZI9dA38I9mFf9uCq9dhffikQ/o7CGyC8YgI/zm1tpFKrQDkGQ5ouJ2X7GOEosUtV8ee2g5cC4d+NIdwrU9WDwIXbyqUY4JvYTyaTUq2s2sWBy/tq8WVAyCyOIESIRdC7KsaobLvOgGPkU+n0qqDGGKVBrLL3lfmHrvx0NIoQIIIvre6j2wU0jMnEChurEElWNXGL4kS/filYOFTEgT29doUGDNX9fYi8iybo0QgQcJkUfBAituQvL4mQDsVU4zOuXZFBmsoMIoKYpawE60X4Uq9hDF0qfTM1QHBKM/xieDeZ6W7NLW+8NoaQgrxGQ1eGAkQnLweO1XodevycCP0g67xecfhfLpXWh/4nhcse2fmq9VR+YOCXvPpZhUAyl2Ojdyu5kMTmNjNIqf4eHuRgjHT+2iRC1EckhpU7tBBho6Upsl2+v9GXcITk9zoAMwES8xES23YTEgz53SQeIMEE8XqDJLHmDwUQuG+NSWQI4yVRgB33hqABYiQQwp+Y4HaeEJ83QZg14snjJf/aToIEfMR92UciO2sBNwnnSdhPSHgbc2PkHAIBEl9jDCEqmjiOkBKD/GPBRQr1MiIsi10+K9EhG78Owh17aCdKYjcScUI+T4TshNg99+EtGiIRuzexiXWO2oPxbeK3E6gtcd8Afm3a/ZsJ/Gnbm0hA3W8ECNnJfE4v3QtE/WQzSux5SBIp2P3knp3cSxD3dshHEbrv0xygaGOETEWXhzJC7BPVoVcoNTGIwyGuGs/Xu82ejowCwvBlb5TseLzbhNxPhD4nJG+PwMf7YWDADc82Rei9n9+B6t6wh6EZIvegfuHtbQrHHtqEa/cjNwj87qZctaM4bgNC4Pc9+vVeeG0zRO75tr0U4efRy3DDZuTyjTMQkkU9JlICb2Eqi9Al7DdrVEyL1QYwVNr6g152ZNu3bY+S4BpwiNyI+IB9tIrQ8oAwYlcQRu07lIdBYOymPUQuhy7bKcIbUc8m8cE14OTlCAVgB06R7TxmCCIRhRxvMDc+D5HtjO9zTCLnsJm5H7h/BkIIbK7pA3yNgc5ouS5tpLJd1iQb016Hb27FdHMj3njoPtRs+8YmQLpxA9jHXIYabt7wgr6QHS+tU5CAmvovkxjoaIwEM2Qn5LtP9dB370aQhAOkgGIapwgj9+8n4Pp9D5qg+/dAybf9Ebg7dPnGDiYJ5jGTncS90OZZCClEQ4TVRqd5h6+VZX9RbYHx0RNRmo9i+ga2VDaSQ+PJMMzQkGrt4pjhVBIOLqnZkNEyGG0OZ3sNEFQjhDR8A1uqDsYUbUeVl8TVjxCpvHHNACEdDDSpYelX38yf72NfTCLzOhiZke7EV1999fXiy4qPQZFe/B04CH2EpdLNm18fLDIvMT5KhFn8u9+98cbrEwgB4PnK/JLQ6NjNUEpvvhLoFFIRgsQyg9mhVxIhQGRw1B0tqeOlGFeblmSE1yjCqjxC32g8evUQyjys98ROpwf0iiK8wvRwDB/HSB+8egjpWAazr4yQvmJ6+OGVa/K4YpFRJ3NfjhH8aYncvILjNCW20WEcdBLmlbOlD/ZwjKbU63IMDbsBoyHCmaeCLpTsgmUNk45V+tvq3l1A2OB4Rl1nUTVASFyWmeiqPMhK5mdKJU+QzFoWJZfuYMSTLp0VZ7tNBtf/1NCaGthSYrHOzUIrTqWysySzys1Llmcriya16CO8I+KYTLVRZ/pAEsd1uwb+kFjmTLOQVUVomyGRQ0U4W1lIc/oIP+t2O2y1DJEMk0yn08l0Mpm+90ohfFwt91jao0ce5lKrrx7CYqlVwxVie0ynJ/Zw7R732SuF8FGxVO3RwUOmR1ffNRq1V0sPv22wjS6uYCozNXYf15Ww7HevFMJH1WK1jouM9hixRtdR1l4xHj5aKJlqRaqHfEfs4fLLzrevFMJvqyW2RucLZR7iFNurJaVPajVcxcrWIaY5weUzLHsyG0LH3JxD7/r3iBCKnB7hI+gw4SQMv0p5SJcJT6WHNptDqZLFsq4LUR/hnO1M7hghdNiGuTgOLZbDqRHelBcat7ZWQQ97vbrI91NTeXyXa0mBuEh2rVMjnLO4Ds5kjz5Cx5HLNfjsqBCXTh4GCL+RVzm2c2mmThehS0n7FAgd64RcVb5aD8i8niDqIrTOG7TH2Qih9mTweRf6ADpJDRAurdDForWOwNBVlmI2PSPCOevK+pJeifoInQOEVuuCzTrOizMQKqpgm1taX9FrUSMpLeGiYWpL6TJ1ITcjwrmri2ZzxTk7wkNXxWzeXR6r6/kID3ahvAOdJjVA+KG66vsuI+BIotDk7kwRlw4R2lykskv0RO9shLhidbdCyNGolToXoa1CdqG8g0kuno+wrmwNaTyeSUpBRFeuErI+I0LT3NHCykpl3Jeci9ABMrri1GtRIykd7GJh5DWXoJSGfXw9hA7rEo4fkMMJj3EOQptp2WKpEOdoVc9FOGc7sljmSWV6hCV1+xAz2PwyE0ITiAwxz47QdiCnmxGh48hM002P8A3cjSGvp8FNWXSoZoqYZoDQ6iLmI9vSzAgxA5djZXFWhKiG6+CfZkB4TZ0LZuTNWfvlqaXUarPNWRfJ4sqKZSaEK5Bu7giSrFjNMyBcwGQLYGRWVmaR0uGE/mBU33A0cQyhGQlMKXE6ySwIMSE5MIEpdVVmkVJMtriyS8wuUIwZEA7ngNW9adPw0LSuDMI6UA/Ny4uzIEQ6sKIezh/NgBBp14p6uLtuvhDCwW7J2foW1sPDBd3exTl9C5tpad06ke7cvoVjYenQphvpn4kQF4Ix8mY7oGl4qC1Tv/N0fu9JL90UvSej8s5B+PprTLmq+tRXqgc82GXyOiKUvf+rh/B1FaHpzNUmLyvC11Viqqb/QPjSI3S88gjRlv4HwhnoBUZ4AW9xZkxz1sjTBREuPAtCw9UmxGJb0CfT3/++WJy4OkRokAwSTlyxqQiNykIqFv84N3nVNgVCebnJ3MxrMYL/6fY/fDrTsoo3b78L7z7cv/DRrXenTDSgTz/+zx6967qVfmOwY4+R+07lfaO41JCI2/3urX/84tf+aZfdmj+6/pEZ0gFC+PL29fen391IyI9+/V/+5b3/6pm2jkMeQv8Q99jvs42Z17URt5eYv/zTLy/9zd8aNOQImc3vXX8TMckIEe8H00GEzN/6xaV/uv0+uTwDwtcGUirK1DGatzDOBBGa337n3bd+culnPzoPo9n843fepYgUhIz5zdu/Mp+LEaXzl5d+8taPb71rvjhCeoKQ0fyhcSZu3CFj/uD6++TT30AdzlwDb2ZufazAURHSa8zZEAnxf/JTaD/m1o8h9WwIldCb9g/l4cSLSCnW8/3r78ly9MtPDTGa331nwK8BQuTr7XeNIQL7/vZvLv0cdACKwNQXRDg41uOCCLH20MBgC3526aef6JsdbIUBkiFCqpsfGUAcZgg3yUbpggir1XNW7hlmoiCEen58C6Rt2OTjGaEkD3FoECrYJzFCFp/85NJvULvNzJe3FEbPjFAep1FPkrk4QoD4K1na0Kh/cenXo2YHGHX7TQ2IEYSKBIzBI5/+/NIv3qJNpf39gggpvGr1WRBquDRSOwXgj98ZsSejCOH3AY8UfD/69aUv1FaiPkX99QIIrym7EZ4ZoVbaUMJ+OvAfYDC/HOXRGEKA+PZ1lcfQMIrJkhOPsn8mhNdUYhyOs0eipkM4Km3Ah1/K/sP87u23x4VwDOHQ+Suub+B2zAxV8GHKWRBeuSJv5b7CjIX309MowrHqoP/4CTDj/dsTgcskQnT+b5sV1zfUYWid0ZBgFoQfqscVFZ8bQpS222MK9bN/uv7fKuOmVQchQ5iPv/z5mB2eDOtmQbg0p3QKca3+c0JI7Y3Wu5nJe+/886T/mERIXd9/v/6u9jZsrzfH2D8TDwcnSMn+EAyNYe/JMJMJhKOeHY0kVL4C/mMkbB1DqLi+T8mI8wcDdWsiopsNoXowFjM4cec5INTaG7NfNqKq/xjYDy1CrXPROn+qmBOBwKw8lI8OY05qdfaseYuZEKrxDTUTgzrK8fNvFEYOEY66Pk3zjIn7RRA+2FcPrGREgZcPvXwuCFV7AwwZMRMaR6AgHEbrQ+MJzeM3azpa4yXOgPDm4Kg6RurnOHoy6UX6h3rXKQPem+jBq/5DGcUYc31KUmpe3h10tMZLnE1Kr8hn1jGryXRfrNXFnsFqE+NMDBAC/25/qcsEajO/+CRiJ5Ux1zdM+8H1927rxeI0/UUszV0mnc51ajVB2rpYD1iHwIheH4+m1TTQ//j5v/553PVp0779L18a9fxnklL5nM5qucXkclKv11xN2588LylFg/HxpK2XE4Fx+dc//+SLT/SHPaBx3nnTSEhn8/jKDvViielv9DlpNW24rs04E32EYOhBysbiGyWF7Pr+8Ofx/scgLbWmRoZmNikdHBTJbKRW+xtpuz1tsK7NOBN9W6rEWhMGf+j6qKVhNP5DkxZV0Kxjp+QsLoYwlU5z/XQ6yRmsVDDORNcfDio3Et9oXd/AW4xZUw0wClWnxJm8hXxMKMSl6WS/I3FdsfYcbCl09ocCNnTgo72+gccfHb/SjFbo9vxnRPioR08oBU/P5FLNTl/oiTPv5daJvEf7c4Pxm1FmjUZtg+GmN29rMZn1bNWMvSfl1FewNBy/wQnPAeFEw9Px4gnXNxp5q+NXH93+YDzts/UtrigHDV9hxE69fgfPvXzWqM385viwGdT+H67/j/FB/4neE/Y//vH6/xzvSE4GpzN6fOUcXqbROKlx4gn722dEqMy7aCuOEcz/eueDsZrrjGIwH38MkjzuPyaabKbIu8wq54/T80u3hFrNaI2wcSYjI1HqvIv6I3V9aEUmbMYEQnkMYzhCOvzBPzqKNZMtlc9oxlXQPAcOf4trNp8lahv10iNdwgmbMTHW9oHSDZFN0icMMcj2ov4QT5zP4unWz8DDkR45dX2aYeGJ8ZvREWHzr4YWZWL+Y9T5zzrWpowmntR6whZufrq4HmqMqE6vb9xmjI7q+8fmn8bnP7TjURcYL8Uxb4Hrr6bEZ0E4iF7IpJwxwzsG9dQghB8mRitk/zGwwJppxtkQDkb1k2k7hGzP4A9VDo2OVYxB1M4+aGbXDKae5PkPxYsOVWBGhOo6bzsE3SmuW7+QHprNimcea/hJiDTcMauz3NQCGXcixoaoCE784ATexRAmUxIvbEnizOM00aA7+ub75i9v/fPZk4cKRLQ3b4JKET8g9BPzRx/43zHs68ogVf/xayomb4eimx794xx1Eapiyoj1Wq3bz/EzIiSM/d49+6/evvXljy69pQzAnJ0CByhuAcLNzRs3MsT85a8MRyuGhch6fek3OAt8O26/8fnm1Ag1K9lZtn5HynENI4RGy1vidrvv4+s/Jr+4JEvT2PIWnRTv3cb1NH67fRO+3L79HjORSq+ct3566dKn5P13rr/vsX+ud8N5CCGyqQncqiFCsrtoQH/5y+Lt27f/96UvLs1rL1fkZJWJ+//tT7duR+HvH+x4/61bf/o3zY/EsKxdQPjJ4jvv3H5v8S9/0Ptdr94jc8DVapntNTv7Rqu+rq5Y9WlhwWoy4eKv/6O9Y3C2yUQyGxKmM9mUb8PfDuVER3pl/X21uAC3L9hw5+IErVw9DyF9HtE+y5ZfvXXeg1luBx5JN9WemWnoRUQ4Usgri7BYXHjFVtBqESpPA3vVECqHX78+QHghHur8NIHQgfPNRnt6pkWov+dpWoTyfLfxGmG1VJ2aWkzW8W1a4wgdy5Z1h2N5+UyIxggdeBiDw6oedDADwtfkY2hnQWg5HK/p3IFlcXdsg944QtyMabXuzlsd6L1Mc/hmssKfOdybb5W35hsitC0dWNbnrjoti5N7qs9D+JoGoaYQQ4SOQ/hk3d2FymEN8R1ctsWy5JpzYIVVnJMId8nyyqLTerQIEYvJsltxmmzzVxd3LTaHEwIfepqEEcK5q6RihgZyzeMOfto4F0ZoeDLkAOE6uWpd2V1csThtjvlly7zDeoDVXly2Hs4fLc6rrJxE6FqsAMIV4jokB9arlmVysGImlkWycEBM8xVt804gtM5XfmsDHs7vukwOk2t3fpKT0yF0TOHxAeG8y1VZXHGarQvk4Igs22idLeRoiVQOQBSNEDrXiWUeEB7YiMW65HIS54rZCcHWusu84pR3hRry8IA4162OqwfLEAUumg90DnGYkocYnJ6PEKTMvIiVAoQrFecRWT8gLhc5WAIxdFaMEUKjwJuFmOfnDonzCOAxLutVcugwmyvy4QqGemi1mEF0Dg9c5nkbSMBFpZQu3ZuCh1dXUEqdlZUF3NBrdu6uALyDA+DhkdUY4a7TaiLAt0Xn8vLCEbFcpTxEhCAHy4fnWBqrdbFiIvPLlXkHSICOjz1/L/csCNHSAKplAIa1tliPyMHh1fUzEdqcLpvNsuuyOs0VUoH7nAcH1t0D63Jl/QjMiAzKCKHNebBc2QUbd0TmVyqVo4Pp9fDKNS1C+lzP87zFuhkQzs9b13eJcx7MqpNADSxQ6/Ul85HVZaSHJmx4sLUHZAV0b4H2m/Caw2pDoSBn2lKby2xePIQsF8GqLe2S3al5+OEVdRiDccjHXZ+P0IQOATSB+rU5x0Jl3kqrbnU44BebqiIGUZtjyVzZJZbxYwjMu8qvxlIKmcvN4pjFWzxu7KkIceFedSqEY/maZzkniu43X3KMXrOuL61bz0Z4PhnxEA9ovab28auzIzStHy3MetbXZGw6uPJ9INzbkyEyKsBZ+/hGceL5fQudgwqeP8KbrafHJRlheZZTI6YgQ4T0OGZ8OwAf6Jjq1IhnQPgknUw9vas87wmf6Gh8YvkIQvnUaOzMOIw2UBoiPFoHINBFWHcRh2NpNJI+o28xeEOyzTnG7zBAeC+dXH16F+efGIkX8Fni7WlOUTItoYNeAje1fLg4G8JB4G6yulxWQDjSJTFEuL6Eb4N7nZblcZEyRJjLUYRXGE7KZreQzj8JC4+xOpxbJ0e2pd0KXLY56BF8c1abpoNqhJAG7ouLVtuy03U4d+gaOT7PMPJ2YtcLowkbDj9aXM7K+GkqRqcKtlvtNq7e25NPM6vV61OcfQm1NO9aEeGyy7Vscxwc4hF8NosTvjk0lTJA6DywQOBuIc5dYlomS9Pw0OqqkGWrCzh/4DxwHULYbhkXfqMT6YpftY7pg58Z9Ziok/OlFHh4lVwFhCBoLuxbEGfFDMHKckXTssYIK5UKnqWzu2LCKGw6hM75+cqKa3dlsbJMoHM5fzCh30Y8bJVkhHuqLZ0K4To5nDcXgYemqxYITc3YYTA5d3/r1JyMc4aUroCUYuxuw87XlAh3oesFCCuu31acVtvR1crimIkzsqX1kklBqHjD/foUerhOltaJCzuEiweAEP5bCMTdu4PDFM9EaFEC9yXoUk6PEBIAQgsEeEu2SuVgaoTHCsIrCsL9xhQnliNCq4uQowNSXEKELkBoWq6MnBp0ri1dJJBuWj10QgIzAZiLS0UrZGE1T4uwaTKJWoSsOA3CQ6iXzUyO1kGhdg9sZorwCGe4ztVD8PF06AleC7RnMWISjXtPu1Yb8G8Fj5fatS6SinNKhJ89LRVFjE0VhPssvzHNed4Yiy7MORy2Izy1Cfdlzi2Qq7YFzU3Pd0SYnhQwN7dEDm1H5NC6bpsYODWK2r4qFbulu2hLcUNJmWXFnMEqaN2ojYqb0syVXdduZRihfB9j3iA8867Kom6OhnHpKd8s7uFZ0PS8AbZxR5oF4QhZDq4unKuHz4QQLIDl4Eg/TjSS0nQ6KSHCElOmetje4i6McPTM5O9n3sLwYGbDqM2eTGaftlqtp7KUltm20Xqal3Rm5l46nebagLCtenzj0z0NZ7n1yXiW+yxSZ7lnKkouz4iH6a0WHvC5fj7C3fnZqHKRZMpKhcUZy0LSX6nwGXeKAPf2SkpcesaZCkarTYzoYskuVpa2wNFK38TtJPRIb7lvgSBnXfX1QhN5VD8GEo9FkeElqdnkOO7OzLuC9Bvv4pUaSXp2PueWQpZM68qTYxlhg4c+fr1uvDaRSsLw8bXq1ZD6VOuRq/JFotTYSIjUjLVl+BPar8M1ckT9PyyNnAtR3cuNe0jrWUE+Wd8IIVnzJyJuQhLBaEIRfHwLZIiPfvIO9AFeoRj9g6cdRUKExDY9DNyophnc5onjJ2gj9ULE7wkzcfXJwSROMv4EbdWAP4Zf3WrqIF7Nh401UAdhrkNVsaMrpZiP25uIboc9BRKM7XgTYa+HBMLBUDAY2faTnWBkrVDwhzMRd5zkgyG3O0QyhWCGKRQ8CZIJ7Hj8waAvGomQqDsR8zJebwhTR9bWQvnQdjgcjBe2ST6Uyfjl/IJhfyFMEpueeGSHBEk4X9gJ+5nN+HYwGg9GgmHIG1rU4/bvuINrOo9GH9R7qWhaX18Hf9hihBxKqSjk9PauEQZqDDkDD8NuaD9o0WAYrkBNSD6aB/SkANfjMXeQcjMS9QdIOBYNJjLevA9+dWc83qAnGolCGiazlo/4M/CpEI3no7GEJ0jckUyB+AvBWHQtGMkQf5j4YjuEKUQiIDBRT8ZLwgHADTmFPYEM/A3DF5JxR4L+GAiCMcLPHj5sdtHYHDNSss8LotDX351HaMV3ol4SLGS2mUIo5g2EsObx8Jp/xw+/IfJg3usJ+6AyCW/QRwJBXzCQWYvBhdhOJuTNh9a8UeCnx7vm87oT0FDhaDzmW3MDQm9iByR6LZpJeGOY31oMBIWQnYh3x4fPIC9kAmEoJQ4I1zIBuD8MhQMDI8FQLH8WwpvyJmD6nJkcfcKFuGq4/5Aoj92mWhMKx8PDZ2urT9WO4a8MNQ9Q35BXvpleID6ffLtfyWdkzSVxh7zKBSpz8O6n96iGyq8xc+rTugdZGAJUn/4gI0xRhLXOufsPZSsZj46YtcEnMrgj5PGrxk61qUpD6eTp94RGTLI25WgZM5G8o4Ru0GM6gLBm/KwgMmLSBxUeXNZpyDMb95luniHbR+LpqQAuX2gy/TQ+WM7I45NoPKMKCNhzoopmIq94jkj0e6nhsxJ5jD0nak0ZLsXjeWZ1fR6SjGctDIIZ9RCPL+zzFDzUHUVCXl+04AkVwrHMi4nwG8XOQOTNp3rykd76u2TBcKBrCHriwbWY101d7xrx+vPgl4Ixn/dshf/BSNVDPJ+GzylPCzI6sRwcQiGxTTbjXl8IECb86CzWEm7wEokdkNVE6AWEqJwaUQQxZaQcL4A/FHijsTYfSTDgeryEiSUSELsRvBIKhhIkVIjsMDfIViwAAA4vSURBVC8owm//2u02gbpgaVISD9Q0ehqS4n08ETWGlK+E8HMk4CFnHib4gxH0D5WjP0oM1xfx6RbixhkeX8fDqiHzmMcaekUNdK1XZIYZjV4e9xuaH7RfB7mruWm/aVLTnc6ypeGkHiLkDc9UAHYxfuAgg50FNb4hJB7zK92CAXMxgEFPgmVGIKxMKD/gHRjEyr0Pfwh7FvJlxuNRghQfBKQhtS3xPa8EL1HIDwtXS4jQLf1qoSGsUzw/Ye7kE3joKTyMJOG+oB5ngBBy2Yz6ot4oE4lC9OghCah4CF5hT8INSugh3qifgSgGYhO/xxeFjxGIvLY3oyQQ8/uhg+T2uaP+kDsRioZIiPFH/Z4A44VYMwHBasTNYAQEOXpIJu+DrlECcyA+dygeKsD1hD/oyRPG64ObE/Dfw4SxoSFc90V90FDQD/AQd55A52UcofKooD1mdVXqS1v9lAHCEAOxdTy6HQq6MUyOeoKxCFTa64EOR4GQ7UQAwlAm4g7EQxAgZ4JMBENzuFaIF9Y8ETRRzA7eEXYn1oBPgYzPG44CFC+znSiEPDH4keR97iCE8lHoXHhD/oiXxAOxUCAKRjvoDa1BHOz178RjoUx0OxEMQjbQAr61fMYNTclAhO5biwdC4wivDBD2+0JHFMV+Vt+WFrAnsSn3nrxMIBRzQ4wDvacCE4vGlN5TOBz1Yu8pHGCChSgi9BJvwROORCMx7LyCvwlGg9gFIu6gJ7IWCYUxJST05gNucK9kLROOhiNxDwkFSDC6RhKxfAj6FPGdhBu9MfYUmYA348GCIR10Q+OBSCSAIur3ZgLQlGNR7/B5TyClPA1LJc4wLsVwJg/GFPq1UX/UG87jFSYYINCGHhrtRIOeEPSA3YFANBLOR+EyvEPVGDd0JqMxuMNTiAYhIQSBcX8m6A8nSAwSRjOBCPQLQer8HmgnBjLMFKJwH+MGZvkRGXQ1QVUzUdCSQsCHZYGGQkOCoiSiGOFnwgmoCvTfDBH2edq1kJqGJ38MrQs2WTATGX5jFP2PyiMMsTwZWAoQJf/A4OKHgjpwQ865PLigeipmWAFmtP/FDJOGjBEK9KFdXHe6s030ozSi/jZ6q849BkmfnfT1EGe5t85BSBi13Z5TVf5daIjwLpMVaFQq8QaRtx/72XmvPxx+mSDifvzBGUMiRdhv6veetgOxcCbsC0dwMOLlIS3CnIiPkq1vJPV7wGDSC4FEIBB7MXtJRqSD0MDjg70OBMNg0sFkv0xiOnISVv0shGgf1+LByRD7BSctwiwiZGtc1mhmhvhfKg2UaRKh0SiGOkSpTLQML2s97gvoSSYRGswfkkSE5GNBNDP+gSZif8XtjZAAg/3fAqhoofCiQdSe0NrHsz3L+wZrhCHaDgdJPhom0JnxhxFqBIJxEsc4MogIITQOxYIvIEKVGImeXmq0zpuEM6EgRvzEHyCh/A6BbgHE/oDQ5/HHIOr3X45Go561F22sRkFIVwxRhIYr2YnvMvFGdkBE/WsRd2QbB2dwHiKS97szkXCEIWuRHejavZgI9+g4jYaHelE1xOyhOA4yML44E/ETJaD2+0nIh5NhJAE97XjoBwBhSBTHhzhKU3p6+vAhw6kIyw8eXD2YN0+MeCgzRsxoAwymn9TXC0JQx8XC1x8iC/fWT1f5p+sywv0hLc8bLEEYRTJ0Fcr3f4fan08A7+u7xQ0TXWayzm218RxhFeFgZ8l+y6k3POcHC+oZSCkoIg4hhAIRpYvqexG8IplH3q1vrVOEp8I6nT+U9VBeNqSCPKpM6iMOongRVQyHtXBsKATBTgBMawAHE7yEyUR+WIik8jU1L8U7rT1QwlZTGRGW6rWGilFl5P7K/HhlEaE/6kX7gkMiZC3ojgEHY9Hojj9I3SKJ7vygCEm0VaKjwCVACMS36MxFlUkJovI0WXZI+791jRscQOj1rUGQk6djtW6ylkkEo544jn/56aBb5AdFSFys8PB4HWebHiLC0nGpWDQ9PU0x6WRKEnBQeBTkyR/GBj784UBE1jqqd55ChIEQJ58hEYjhCAkU4t4fcrKUuL4Cjj1t4xHQd57i5GGpaDru29OrTJ/n+qlkMpXjEGdDJfGv46PIY95CO/QlL0I4Y2nE905k/qsSsq9YbLXbYEJRPltZ4F4/x/D1Gi6n4frZ3OrqhtSki9y4piCKZyzIGc9f8/6DEKksyHNNptPVdDJ9jF+KT9O5fm41iQgp0Qd3icf1+rF43AYmCslpTw47r3S/z5CeSwFYxmcOitDUTiMJ5ep6tXWa7K+m7WlEiCsx6nV8iLwqo9BfFPk7U59wd2bh2vUz4/Qc8qdl5O1dAYjnU8BBkE1B6HKclEynJE5iBBlhT5D6nFgbKqLxvPd5gAbjq1RRPZrxbTK8rH3TjGlfDDX5doutmtaL660UAEwn+SoanNaW0CiXjxk8frZWF7mkPdXfGoX4fxdnLg5imwiugorDG+NjEoQU8nGSyCTgFUrEwJl6iA9eoXzMv5bwQ/QQyvgAVSxKPDHG78lHpj03UFvo/F+3yvQIGpMAYskJFGGxutUuryBC0MO6yNvTfZ5PCvXuQC2Bfj87wgyz7c/HQjuhCHauQjguEIB/BZKBjzinmvcX/FHocGbwClOA32gqEo8wmUQU+p2zm2Tylzuptgyx3K6390XOhCfqV7l2mRWyjMRxPCel7MlcLpnObQEj+9msJGWRUjPLDAm5E+5QtBAPgquM4mKjGCCBF4OTNh5PxBPwx0gkFAV2Zkg+6iZ09WmAxryBhM8XScwc+xHzQ1C/De4UNx+wbLvNS09bT9vHp31OAIfBcKChXSkpcbm0vc/jXCIuH6rhq3YRMcXpQgZXECZi/gDBmbg8ycdiJBZLeGKeSCboz0N/Mp+JkbDPk3fDb4koEw9EmULGl/Al4qGZeUiiW6lkbiO7defOxmo6lb2T2wC7cyoIOYlPJpOM0AMzyif7KQDY6ckyOlDE/3cBpRiaGqKsMhysSRyaG5DdyesXNDXkYP94o9ECMQUXccw1y8dUSk0m7pjlcoKCMJ1M5jheZt8QZG12RZyyUiHP8xv3IMu2Vo4FNSxRY1OuIkIk4bhaLVcZCF56YElTwFJeUB5KKgoyGa0ieg61eo6dSXJzobXVMlGXX8QDk463yojWdHpsMpmqDAhwFsQXmEgplYLv/X5fQuI+O8Nbvzi01Grn2rgWEexLu30s8qnT4+Pj09O+hFxieHyXUnynIwiclE2t5vrITUHodMDqPFLpM6AnT57ce/Lks28/e/Lou+++e/z48Xf46fF3Dx48fvT4gUyPv33ynfp5QEtADx48evKd/BE/fyZ/go+Pn0DmNCmUotyA1/EK/Af6/e8fPfrjH2kl/viZQt8OPnz7qMtzq2AwT08BFQcOMZ0Sway2j3m+3W4dK1Ka64g93HQhil1wHavJZDoJb6vwwiAhTQ+MzmXv8GIPiMuimp4ACXReRzPKw57wW40T5Up5/wR0We2SNfjVeq2NBGogbSkP6RX4Zm4rneJ4fssOXZ2HD5sPm82HD/EIhDt37jzsPmzy/DEGzMfH7adtCCeBU/SAOeWZ95QcrSxLXaCJzdLqNsrg8KvHEJ+aHEynJ/Y6XA4B1uTwtIcF0ygPCMI76Grg4j6Rhq4Yn3N9ETtaGAnlUHXByx6LdF388akg5QQlMaST+v3kai7LUeqnMB9oacxCOgWoT9tPn7ZPU0JfqkMwwtXFbJttnJ6yuOlTfeIdEh57qCIyKQ/IUZ6UQ3tMjlau7aBQT+009G4DsmoLYhuHyQRSCv/6KV4QNKg40EF4gTqiTqZyuVwWNLOfy0kbuVQKKp3KZaWmlF2FGEGiTcBjPuCGOlJKAC1AVjVqYh8LzNVxCIhlBamBQ0Fso1oun/K4d5Ue/SOucqvdWmpDPKn3N072xXSaV8E5imOE+4IVZPIFGaqplWqbZIQUYLJeBnypNN8CJoKlAQyrSbQtENzwtK6UqEUVBVH+LNInI1MSpb78WRSkDToEIkuhPIfFS1RKUXZPMEoEhLXfIrIToX8iD3YBQrHJUi7hDl2RE07qqTq80jy7306lxDJCpM9rovwbULXc0tJTSmBbjoVV7pQSl8aHAqW3ms3sajK9mr3zkGcwihH6UOfe0BnqUkMJBGo1qd8RQLv7EOalRBXgCVuvN04UhHSshz2R7ADRzsP3MnwVco0TdahL4NSRPUgJWRwLdR50H4LkuiAcK4RVFlSh2gKTD6JE1XMrm9vimg85UNmmgGzhkhzIzbGi5cdZESQGmvYYlZaR13wpXDECp6VaXUpCAISEVms4GIm/NWp8H4BCcNhot+sSNmiKrs8VBCmVlngui5WVpFRqC6q8lU2BvK8CwTu4ZBR+UIsturQehYny5VgWetTbpy1FPauytVF4XGaTx1SilSOvONBDVhDgHZ9hSWWwL4kyE1XqyRZHDQCGkQCEe0KOgqPiAPEs2GkI3ak2Qu0kjAyzWahzKrexmoQ6owJnJU7g+hu8oNS2zkvH0ATssN3Y9lOWbSiDtlWqovSxjANjQw9ZNY0rpgILEZrUL+WyRC2NorMMWBFq8PAP6OTGxkYKaDWF7n9VjgLk6m5gb6Of7W/0U3aZgxAe9Id6q0REIA5gZ+v1NvCT42oDNQU/0q8po8770MEZDM5Wq4PDuOSXSWNFJyGVlOhsgA9BtVLHCkDctc1uHYMmg7GhxNDoRVtT1c4MSWZrra3IbJ1bTfWBKaJIBfhkaGfQRXLcyYk6Itnn5c8IChByJ6z68BdR+YxvCkCT+ndgZDQfqUy2WtUWWic5eoH+kaKtUN0UDV9E0MgsNPuq1Gx2ARAObZz+fx9mOAgvUa7mAAAAAElFTkSuQmCC"
        }

    ];
    const [currentTable, setCurrentTable] = useState(mockData);
    const [previousNavbarId, setPreviousNavbarId] = useState("room-show");
    const [isMenu, setIsMenu] = useState(false);


    const changeNavbar = (currentNavbarId) => {

        document.getElementById(currentNavbarId).style.color = "#000";
        
        document.getElementById(previousNavbarId).style.color = "#FFFFFF";
       
        setPreviousNavbarId(currentNavbarId);

    }

    const setTableTile = (currentNavbarId) => {
        var titleObject = document.getElementById("title-table");
        if (currentNavbarId == "room-show") {
            titleObject.innerHTML = "Phòng";

        } else if (currentNavbarId == "decoration-show") {
            titleObject.innerHTML = "Trang Trí";
        setCurrentTable(mockData2);


        }else if (currentNavbarId == "stage-cus") {
            titleObject.innerHTML = "Chương Trình";
        setCurrentTable(mockData);


        }else if (currentNavbarId == "music-show") {
            titleObject.innerHTML = "Âm Thanh";
        setCurrentTable(mockData2);


        }else if (currentNavbarId == "menu-customer") {
            titleObject.innerHTML = "Thực Đơn";
        setCurrentTable(mockData);

            
        }

    }

    const changeTable = (currentNavbarId) => {
        changeNavbar(currentNavbarId);
        if (currentNavbarId == "menu-customer") {
            setIsMenu(true);
        } else {
            setIsMenu(false);
        }

        setTableTile(currentNavbarId);

        // var newData = fetchData(currentNavbarId);
     //   setCurrentTable(mockData2);

    }
    return (
        <div className="menu-customer">


            <div className="container-xxl py-6">
                <div className="container">
                    <h1 className="display-6 mb-4 center-title">DỊCH VỤ</h1>
                    <p className='mb-0 font-menu'>- Dịch vụ tổ chức tiệc sinh nhật của chúng tôi không chỉ là việc tổ chức một buổi tiệc, mà còn là việc tạo ra một trải nghiệm đầy ý nghĩa và đáng nhớ cho bạn. </p>
                    <br></br>

                    <p className='mb-0 font-menu'>
                    - Từ việc lên kế hoạch cho chủ đề đến việc chăm sóc mỗi chi tiết nhỏ, chúng tôi cam kết mang lại sự hài lòng tuyệt đối và không gian ấm áp, vui vẻ cho mọi người tham dự. Hãy để chúng tôi chia sẻ niềm vui và hạnh phúc cùng bạn trong ngày sinh nhật đặc biệt này!
                    </p>
                    <br></br>
               
                    <div className="wrapper d-flex align-items-stretch">


                        {/* <!--  Side Navigation  --> */}
                        <nav id="sidebar" className='col-lg-2'>
                            <div className="custom-menu">
                                <h5>Quy trình</h5>
                            </div>
                            <ul className="list-unstyled components">
                                <li><button className='btn btn-primary rounded-pill button-custom' style={{ color: "black" }} onClick={() => changeTable("room-show")} id="room-show">
                                    Phòng</button>
                                </li>
                                <li><button className='btn btn-primary rounded-pill button-custom' onClick={() => changeTable("decoration-show")} id="decoration-show">
                                    Trang Trí</button>
                                </li>
                                <li><button className='btn btn-primary rounded-pill button-custom' onClick={() => changeTable("stage-cus")} id="stage-cus">
                                    Chương Trình</button>
                                </li>
                                <li><button className='btn btn-primary rounded-pill button-custom' onClick={() => changeTable("music-show")} id="music-show">
                                    Âm Thanh</button>
                                </li>
                                <li><button className='btn btn-primary rounded-pill button-custom' onClick={() => changeTable("menu-customer")} id="menu-customer">
                                    Thực Đơn</button>
                                </li>
                            </ul>

                        </nav>


                        <div id="content" className="col-lg-10 scrollable-table-wrapper">

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ backgroundColor: '#EAA636', zIndex: '100' }}><h5 id="title-table">Phòng</h5></th>
                                    </tr>
                                </thead>
                                <tbody className='' >
                                    {currentTable.map((element) => {
                                        return (
                                            <tr className='row-container'>
                                                <img src={element.image} className='col-lg-3' style={{ width: '200px', height: '200px' }}>

                                                </img>
                                                <div className='col-lg-9 '>
                                                    <div className='row-content-header'>
                                                        <h5 className='col-lg-9'>{element.name}</h5>
                                                        <div className='col-lg-3'>
                                                            <h5 className=''>Giá: {element.price} vnđ</h5>
                                                            {isMenu 
                                                                ? <h5 className=''>Chọn:<input className='margin-checkbox' name="elementChoose"type='checkbox'></input> </h5>
                                                                
                                                                : <h5 className=''>Chọn:<input className='margin-checkbox' name="elementChoose"type='radio'></input> </h5>
                                                            }
                                                            
                                                        </div>
                                                    </div>
                                                    <div className='row-content-body'>
                                                        <div>{element.content}</div>
                                                    </div>

                                                </div>

                                            </tr>
                                        )
                                    })
                                    }

                                </tbody>
                            </table>
                        </div>

                    </div>

               
                </div>
            </div>
        </div>
    );

};
export default ServiceCustomer;
