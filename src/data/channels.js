//{channel name, playlists array, number of episodes in playlist(max 200), true if we want to start at a random point in the video}

const Channels =
    [
        { name: 'Ch: 1 - Gameshows80', list: ['PLuKKJ5FR6_i-G3X2qR9kJ6TRri07AKsJe'], episodes: 194, randPoint: 0 },
        { name: 'Ch: 2 - Classic Gameshows', list: ['PLMK_6ky6NNPquQ8vAnN-qCIoHdW1lwpRq'], episodes: 200, randPoint: 0 },
        { name: 'Ch: 3 - Price Is Right', list: ['PL8qCHhbAE4pOUkwTUoGISIfrFNO9uXFk5', 'PL8qCHhbAE4pOUkwTUoGISIfrFNO9uXFk5'], episodes: 200, randPoint: 0 },
        { name: 'Ch: 4 - Jeopardy!', list: ['PLAzwm-_ugsYC6SsJMjKbzvE2nk0307yIn'], episodes: 200, randPoint: 0 },
        { name: "Ch: 5 - Whose Line", list: ['PLDyueIBpFFG6W_2txiVyc5VYindbBFjSn', 'PLo6LMGdjaTzKN9VsQviEkw_L8xs_LjmZz', 'PLo6LMGdjaTzJwWO5RHYx3v4_Zl8gAbvrE', 'PLo6LMGdjaTzKIigOk1hsQa9bN413E_m9v'], episodes: 200, randPoint: 0 },
        { name: "Ch: 6 - Cartoons Forever", list: ['PLhNec9tcvCfBir8KQxopOdDGxTMsXtj3Z', 'PLo6LMGdjaTzI76fH66OWjpBJw0cleQGC6'], episodes: 200, randPoint: 0 },
        { name: "Ch: 7 - WB Cartoons", list: ['PLJYf0JdTApCofHRdo-RXjd2uHUl1551oI'], episodes: 200, randPoint: 0 },
        { name: 'Ch: 8 - Toonami Swim', list: ['PLo6LMGdjaTzIQMz6eUB-Y74F87PRvvi_q'], episodes: 8, randPoint: 1 },
        { name: 'Ch: 9 - Saturday Morning', list: ['PLo6LMGdjaTzIaer3XW-Hw9zalxpnFBPS7'], episodes: 17, randPoint: 1 },
        { name: 'Ch: 10 - Kablam', list: ['PLUiXHUbyt3otcSGKiOCzZn4pFalAt3sFS'], episodes: 48, randPoint: 0 },
        { name: 'Ch: 11 - Recess', list: ['PL3panSrIeiNJZN_qyGZvhvtI4R-xKsEW8'], episodes: 135, randPoint: 0 },
        { name: 'Ch: 12 - Pepper Ann', list: ['PLLhOnau-tupR82ubLjcY2tQNlUMGTn__z'], episodes: 160, randPoint: 0 },
        { name: "Ch: 13 - 80's TV", list: ['PLGS5pi29Z6qFmRfb4q9RPURwKK0xMk6IT'], episodes: 200, randPoint: 0 },
        { name: "Ch: 14 - Computerphile", list: ['PLo6LMGdjaTzLKMVX0XpRnBC5lsB0tdW1L'], episodes: 199, randPoint: 0 },
        {
            name: 'Ch: 15 - Computer Chronicles', list: ['PLmM8tWTshxQBws_fIdi5qH63rZxrlB0qL', 'PLo6LMGdjaTzJ-1c0eMes7t3kqDaJARw0S',
                'PLo6LMGdjaTzKTYLTLmaF3rhlQpPaqC6jd'], episodes: 200, randPoint: 0
        },
        { name: 'Ch: 16 - TechTV', list: ['PLo6LMGdjaTzKuVaftTtnSPfMOOlFhORm8'], episodes: 1, randPoint: 1 },
        { name: 'Ch: 17 - Xplay', list: ['PLKE9oP_rYnRdLhG3HW__6ytTwvgSBM9pu', 'PLo6LMGdjaTzLBjKmMxHWuTWwXleScacyA'], episodes: 150, randPoint: 0 },
        { name: 'Ch: 18 - Sitcoms Make Me Cring', list: ['PLGk6y7qjGXVt-tH7E0P2CEedDGJp-fT1p'], episodes: 463, randPoint: 0 },
        { name: 'Ch: 19 - MTV', list: ['PLId5xJ_xHV-k3ZgNju2ifMLct7-8uRKr8'], episodes: 200, randPoint: 0 },
        { name: 'Ch: 20 - MST 3000', list: ['PLDXsAHvr3XNPn8PfqYpU7NBHWOzdow89l'], episodes: 177, randPoint: 0 },
        { name: "Ch: 21 - 90's B-Movies", list: ['PLKxdKKLx3iRTyfWK8SQghHUGHfOTGhRl2'], episodes: 200, randPoint: 0 },
        { name: "Ch: 22 - 80's B-Movies", list: ['PLKxdKKLx3iRQbB2m8NkfX6e-PwMvNI-Wl'], episodes: 200, randPoint: 0 },
        { name: "Ch: 23 - Free Movies", list: ['PLHPTxTxtC0ibVZrT2_WKWUl2SAxsKuKwx'], episodes: 200, randPoint: 0 },
        { name: "Ch: 24 - Vintage Movies", list: ['PLyMSG-Q0Oh8cr6AG1jbptCGW5P6n-_Szz'], episodes: 129, randPoint: 0 },
        { name: 'Ch: 25 - Scifi Movies', list: ['PLo6LMGdjaTzJ8y8OBialU_RVhIXg8HpLe'], episodes: 73, randPoint: 0 },
        { name: "Ch: 26 - Horror/SciFi Movies", list: ['PL2e8s2GMT08wtackx9qxf_cJZsTxVy0yL'], episodes: 200, randPoint: 0 },
        { name: "Ch: 27 - Seaonal Flixs", list: ['PLo6LMGdjaTzJzG8GLIcleCBci8R8ZN54S'], episodes: 7, randPoint: 0 },
        { name: "Ch: 28 - NFL 80s", list: ['PLAr_WbjGaCm5laqRScaYFlNiDSrLLW4rn'], episodes: 200, randPoint: 0 },
        { name: "Ch: 29 - Vintage TV", list: ['PLVPqan6x_34F-M2lCiaTzRSX6jxyQbXcL'], episodes: 200, randPoint: 0 },

    ];

