                        <?php
return [
  "POST" => [
    "/api/reports/create"=> 10,
    "/api/benchmarks/add" => 15,
    "/api/team/invite"=>25,
    "/api/social-accounts/add" => 5,
    "/api/auth/login" => 1,
    "*" => 1,
  ],
  "DELETE" => [
    "*" => 2,
  ],
  "PUT" => [
    "*" => 1,
  ],
  "GET" => [
    "/api/packs" => 30,
    "*" => 1,
  ],

];

                    