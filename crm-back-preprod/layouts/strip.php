                        <?php
    return [
        "Packs" => [
            "demo" => [
                "name" => "Demo Pack",
                "limits" => [
                    "SocialAccount" => [
                        "max_have" => 4,
                        "deletes" => 2,
                    ],
                    "users" =>  [
                        "max_have" => 2
                    ],
                    "Benchmark" => [
                        "max_have" => 1,
                        "deletes" => 1,
                    ]
                ],
            ],
            "masters" => [
                "name" => "masters",
                "limits" => [
                    "SocialAccount" => [
                        "max_have" => 9999999,
                        "deletes" => 9999999,
                    ],
                    "users" =>  [
                        "max_have" => 9999999
                    ],
                    "Benchmark" => [
                        "max_have" => 9999999,
                        "deletes" => 9999999,
                    ]
                ],
            ],
            "prod_DYS24DvJcjFhqR" => [
                "name" => "Starter pack",
                "payment_plans" => [
                    "201809_s_y" => "Monthly",
                    "201809_s_q" => "Quartly",
                    "201809_s_s" => "Simistrial",
                    "201809_s_y" => "yearly",
                ],
                "limits" => [
                    "SocialAccount" => [
                        "max_have" => 4,
                        "deletes" => 2,
                    ],
                    "users" =>  [
                        "max_have" => 2
                    ],
                    "Benchmark" => [
                        "max_have" => 2,
                        "deletes" => 1,
                    ]
                ]
            ],
            "prod_Dxc5IoyZLDvUNn" => [
                "name" => "Business pack",
                "payment_plans" => [
                    "p_p_2018_11_m" => "Monthly",
                    "p_p_2018_11_y" => "yearly",
                ],
                "limits" => [
                    "SocialAccount" => [
                        "max_have" => 20,
                        "deletes" => 10,
                    ],
                    "users" =>  [
                        "max_have" => 5
                    ],
                    "Benchmark" => [
                        "max_have" => 10,
                        "deletes" => 5,
                    ]
                ]
            ],
            "prod_DxcQL3ODLKyxbH" => [
                "name" => "Pro pack",
                "payment_plans" => [
                    "b_p_2018_11_m" => "Monthly",
                    "b_p_2018_11_y" => "yearly",
                ],
                "limits" => [
                    "SocialAccount" => [
                        "max_have" => 10,
                        "deletes" => 5,
                    ],
                    "users" =>  [
                        "max_have" => 3
                    ],
                    "Benchmark" => [
                        "max_have" => 5,
                        "deletes" => 2,
                    ]
                ]
            ],
            "prod_DxcSy9cLDkWjdA" => [
                "name" => "Growth pack",
                "payment_plans" => [
                    "g_p_2018_11_m" => "Monthly",
                    "g_p_2018_11_y" => "yearly",
                ],
                "limits" => [
                    "SocialAccount" => [
                        "max_have" => 40,
                        "deletes" => 20,
                    ],
                    "users" =>  [
                        "max_have" => 10
                    ],
                    "Benchmark" => [
                        "max_have" => 20,
                        "deletes" => 10,
                    ]
                ]
            ],
            "prod_DxcT34GyU5FM31" => [
                "name" => "Wide pack",
                "payment_plans" => [
                    "w_p_2018_11_m" => "Monthly",
                    "w_p_2018_11_y" => "yearly",
                ],
                "limits" => [
                    "SocialAccount" => [
                        "max_have" => 100,
                        "deletes" => 50,
                    ],
                    "users" =>  [
                        "max_have" => 20
                    ],
                    "Benchmark" => [
                        "max_have" => 40,
                        "deletes" => 20,
                    ]
                ]
            ],
            "additional_social_account" => [
                "name" => "Adtional social account",
                "additional" => true,
                "limits" => [
                    "SocialAccount" => [
                        "max_have" => 1,
                        "deletes" => 0,
                    ],
                    "users" =>  [
                        "max_have" => 0
                    ],
                    "Benchmark" => [
                        "max_have" => 0,
                        "deletes" => 0,
                    ]
                ]
            ],
            "additional_benchmark" => [
                "name" => "Adtional benchmark",
                "additional" => true,
                "limits" => [
                    "SocialAccount" => [
                        "max_have" => 0,
                        "deletes" => 0,
                    ],
                    "users" =>  [
                        "max_have" => 0
                    ],
                    "Benchmark" => [
                        "max_have" => 1,
                        "deletes" => 0,
                    ]
                ]
            ],
            "additional_user" => [
                "name" => "Adtional user",
                "additional" => true,
                "limits" => [
                    "SocialAccount" => [
                        "max_have" => 0,
                        "deletes" => 0,
                    ],
                    "users" =>  [
                        "max_have" => 1
                    ],
                    "Benchmark" => [
                        "max_have" => 0,
                        "deletes" => 0,
                    ]
                ]
	    ],
	    "lifetime" => [
                "name" => "lifetime",
                "payment_plans" => [
                    "b_p_2018_11_m" => "Monthly",
                    "b_p_2018_11_y" => "yearly",
                ],
                "limits" => [
                    "SocialAccount" => [
                        "max_have" => 10,
                        "deletes" => 2,
                    ],
                    "users" =>  [
                        "max_have" => 3
                    ],
                    "Benchmark" => [
                        "max_have" => 5,
                        "deletes" => 2,
                    ]
                ]
            ],
        ]
    ];
?>

                    