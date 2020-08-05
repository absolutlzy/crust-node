# Crust Network Milestone Deliverables

## Open Source Repos

- [Crust](https://github.com/crustio/crust)  
  The chain node which implement Crust protocol based on substrate.
- [Crust sWorker](https://github.com/crustio/crust-sworker)  
  The quantitative layer(storage and computation resources) based on TEE technology.
- [Crust API](https://github.com/crustio/crust-api)  
  The middleware layer connecting sWorker and Chain Node.
- [Crust Node](https://github.com/crustio/crust-node)  
  Official crust node service for running Crust protocol.
- [Crust Apps](https://github.com/crustio/crust-apps)  
  A Portal into the Crust network based on [@polkadot/apps](https://github.com/polkadot-js/apps). Provides a view and interaction layer from a browser.

## M1 Deliverables

| Number | Deliverable                                                                                                                                                                                            | Link                                                                                                                     | Notes                                                                                                                                                                            |
|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1      | Users will be able to **check Crust nodes' empty and meaningful storage volume and status** through Crust Apps.                                                                                    | [Look through Work Report](#1-look-through-work-report)                                                                                                 | MPoW-1: work report runtime module to quantify storage volume and monitor storage status.                                                                                        |
| 2      | Users will be able to **see nodes' TEE identity** through Crust Apps.                                                                                                                              | [Look through TEE Identity](#2-look-through-tee-identity)                                                                                                | MPoW-2: TEE (SGX solution) node onboarding and on-chain verification, nodes with SGX CPU can join Crust network                                                                  |
| 3      | Once nodes’ physical storage space changes, node owners will be able to **see nodes' storage volume automatically changes next era** through Crust explorer.                                           | [Dynamic storage change](#3-look-through-work-reports-change-when-increasing-or-reducing-storage-volumn)                                                                     | MPoW-3: dynamic storage scaling feature (including both empty and meaningful storage) to improve network availability                                                            |
| 4      | Users will be able to **check nodes’ (both validators and candidates) stake limit and valid stake** through Crust Apps.                                                                            | [Look through stake limit and valid stake](#4-validator-will-be-able-to-look-through-his-stake-limit-and-valid-stakes)                                                                                 | GPoS-1: Implement the feature to set stake limitation based on storage volume reported by MPoW work report.                                                                      |
| 5      | Users will not be able to **stake/vote exceed any node’s staking limit at any time**, and a node will **not be able to become a validator with no stake limit** claimed.                               | [Active check](#5-active-check-based-on-stake-limit)                                                            | GPoS-2: Implement active stake check based on validators and guarantors’ actions                                                                                                 |
| 6      | Users should be able to **see validator's stake limit (maybe) changed** and so his **valid stake  and his guarantor's valid stake (maybe) changed in each new era begins** through Crust Apps.     | [Passive check](#6-passive-check-based-on-stake-limit) | GPoS-3: Implement passive stake check. At the end of each era, while nodes’ stake limit could be changed according to factors like whole network storage volume and local volume |
| 7      | Users will be able to **see validator set changes(from stakes high to low order) at each era** through Crust Apps.                                                                                 | [Validator election algorithm](#7-validator-election-algorithm)                     | GPoS-4: Implement validator set election algorithm, it selects validators from high to low according to the nodes’ total stakes.                                                 |
| 8      | Users will be able to **get/put files through Crust Maxwell’s storage interfaces**. In addition, users will be able to **see the meaningful storage volume changes** accordingly through Crust explorer. | [Provide storage interface to store meaningful file](#8-providing-storage-interface-to-store-meaningful-file)              | Storage-1: Provide basic meaningful storage capabilities. Storage API will be finalized in M2. In M1 will provide basic FastDFS interfaces.                          |
| 9 | Finish **technical white paper** and publish on Crust website |  [Technical white paper](https://crust.network/whitePaper) | Documentation-1 |
| 10 | Provide **wiki** on how to explore Maxwell on GitHub. | [Crust Maxwell Wiki](https://github.com/crustio/crust/wiki/Maxwell-1.0-User-Guide) | Documentation-2 |
| 11 | Provide a basic **Github action** including building and testing on Ubuntu in crustio/crust repo | [Crust Github Action](https://github.com/crustio/crust/actions) | Open Source-1 |
| 12 | Provide a basic **Github action** building on Ubuntu in crustio/crust-sworker repo | [Crust sWorker Github Action](https://github.com/crustio/crust-sworker/actions?query=workflow%3ACI) | Open Source-2 |
| 13 | Provide a basic **Github action** including building on Ubuntu in crustio/crust-api repo | [Crust API Github Action](https://github.com/crustio/crust-api/actions?query=workflow%3A%22Yarn+CI%22) |Open Source-3

## Testing Guide

### 1. Build

#### Pull from docker hub

Or you can just pull the official images from [Docker Hub](https://hub.docker.com/u/crustio), just run

```shell
docker pull crustio/crust:0.7.0 & docker pull crustio/crust-sworker:0.5.0 & docker pull crustio/config-generator:0.1.0 & docker pull crustio/karst:0.2.0 & docker pull crustio/crust-api:0.5.0
```

#### Build docker from source

Crust including 5 parts to build docker images, you can refer the document links below to clone and build from source code:

- [Crust](https://github.com/crustio/crust/tree/master/docker#dockerize-crust)
- [Crust sWorker](https://github.com/crustio/crust-sworker#docker-model-for-developers)
- [Karst](https://github.com/crustio/karst#docker)
- [Crust API](https://github.com/crustio/crust-api#docker-launch)
- [Crust Config Generator](https://github.com/crustio/crust-node/blob/master/generator/README.md#build-docker)

### 2. Run

Please refer the [Node Setup Manual](https://github.com/crustio/crust/wiki/Maxwell-1.0-Node-Setup).

***NOTES***: We already provide you 4 accounts: `W3F V Controller`, `W3F V Stash`, `W3F G Controller` and `W3F G Stash`. **Please use those 4 accounts to run and test due to it already contains some CRUs inside**.

### 3. Test M1 deliverables

#### 1. Look through work report

- Step1 - Make sure you already start [Crust sWorker](https://github.com/crustio/crust/wiki/Maxwell-1.0-Node-Setup#63-start-sworker) and see your work report has been reported
- Step2 - You can look through the work report from Chain state in [Crust Apps](http://apps.crust.network/#/chainstate), like the pic shows below

![work_report](m1_img/1.png)

#### 2. Look through TEE identity

- Step1 - Make sure you already start [Crust sWorker](https://github.com/crustio/crust/wiki/Maxwell-1.0-Node-Setup#63-start-sworker)
- Step2 - You can look through the sWorker identity from Chain state in [Crust Apps](http://apps.crust.network/#/chainstate), like the pic shows below

![identity](m1_img/2.png)

#### 3. Look through Work report's change when increasing or reducing storage volumn

- Increasing storage  
  - Step1 - Run command below to increase 10GB storage

  ```shell
  curl --location --request POST 'http://127.0.0.1:12222/api/v0/srd/change' --header 'backup: {"address":"5EkFb4p7R4qnGTTYbsi7mQQzL1e7D13RQwBMm49HkN6bvzjt","encoded":"0x4800d1de3925a9b792ae2497a5ed109af5eb6d8b8d46936ccee405dd661c7a5ef96c7eb263cf3bf71bd6667a2e942e4e1c78b0bee8a325da3512880882299318483deeec128acb4a0f4fc9a12638817546356017aded813a6c52a689635d7a9d420cb7c5f60ade3d0d2f4bd0f370377069d5799161b586f32e9508b5ac9d4561002b66fcbb73f3bbf6a8c006e9e9f13a726ce278221e6ecdb04c288808","encoding":{"content":["pkcs8","sr25519"],"type":"xsalsa20-poly1305","version":"2"},"meta":{"genesisHash":"0xa5bec4b73f15b4f6e99eee42778ab6754c90aeadcd2ae86aa79e9c5c7a55dd30","name":"w3f_V_controller","tags":[],"whenCreated":1596525471197}}' --header 'Content-Type: application/json' --data-raw '{"change":10}'
  ```

  - Step2 - **After 1 era**, you can look through the new work report from Chain state in [Crust Apps](http://apps.crust.network/#/chainstate)
  ![increase_storage](m1_img/3-1.png)

- Decreasing storage
  - Step1 - Run command below to decrease 10GB storage

    ```shell
    curl --location --request POST 'http://127.0.0.1:12222/api/v0/srd/change' --header 'backup: {"address":"5EkFb4p7R4qnGTTYbsi7mQQzL1e7D13RQwBMm49HkN6bvzjt","encoded":"0x4800d1de3925a9b792ae2497a5ed109af5eb6d8b8d46936ccee405dd661c7a5ef96c7eb263cf3bf71bd6667a2e942e4e1c78b0bee8a325da3512880882299318483deeec128acb4a0f4fc9a12638817546356017aded813a6c52a689635d7a9d420cb7c5f60ade3d0d2f4bd0f370377069d5799161b586f32e9508b5ac9d4561002b66fcbb73f3bbf6a8c006e9e9f13a726ce278221e6ecdb04c288808","encoding":{"content":["pkcs8","sr25519"],"type":"xsalsa20-poly1305","version":"2"},"meta":{"genesisHash":"0xa5bec4b73f15b4f6e99eee42778ab6754c90aeadcd2ae86aa79e9c5c7a55dd30","name":"w3f_V_controller","tags":[],"whenCreated":1596525471197}}' --header 'Content-Type: application/json' --data-raw '{"change":-10}'
    ```

  - Step2 - **After 1 era**, you can look through the new work report from Chain state in [Crust Apps](http://apps.crust.network/#/chainstate)
  ![decrease_storage](m1_img/3-2.jpg)

#### 4. Validator will be able to look through his stake limit and valid stakes

> **NOTE**: Make sure you have already been bonded your `Controller-Stash`, otherwise you cannot test this No.4 function.

- `Stake Limit`: After the node uploads the work report, it can immediately see the change of the stake limit from Chain state in [Crust Apps](http://apps.crust.network/#/chainstate)
  ![stake_limit_change](m1_img/4-1.png)
- `Valid Stake`: In each era, user can check the `ledger` API to get the `valid stakes` value's change from Chain state in [Crust Apps](http://apps.crust.network/#/chainstate):
  ![ledge_valid_stakes](m1_img/4-2.jpg)

#### 5. Active check based on stake limit

- `validate`: If the user wants to become a validator after bonding, the stake limit > 0
  - Step0 - Make sure you are already **bonded**
  ![guarantor_bonded](m1_img/5-1.png)
  ![guarantor_validate](m1_img/5-2.png)
  - Step1 - When your `stake_limit == 0` and call `validate`, you will get `NoWorkloads` error (**Please use your guarantor accounts to test, because your validator accounts already have stake limit now.**)
  ![stake_limit_zero](m1_img/5-3.png)
  - Step2 - When your `stake_limit > 0` and call `validate`, you will validate successfully (**You are already tested this function inside the Node Setup Manual**)
  ![validate_success1](m1_img/5-4.png)
  ![validate_success2](m1_img/5-5.png)
  ![validate_success3](m1_img/5-6.png)

- `guarantee`: Guarantor guarantee amount cannot exceed the validator’s stake limit(***Please make sure you are using the gurantor accounts***)
  - Step0 - Make sure you are **already bonded**
  - Step1 - Call `guarantee`, and guaranteed stakes > remain_stakes(stake_limit - bonded_stakes)
  ![guarantee](m1/../m1_img/5-7.png)
  ![guarantee](m1/../m1_img/5-8.png)
  - Step2 - You can see the `other stake` under `Staking` module in [Crust Apps](http://apps.crust.network/#/staking) after an era
  ![staking_others](m1_img/5-9.png)

#### 6. Passive check based on stake limit

> Passive check happens at the begin of each era, mainly influent (validator + guarantor)'s `stakers` and `ledger.valid`.

- If validator's stake limit goes **larger**, nothing will happen
- If validator's stake limit goes **smaller**:
  - Case1: `stake_limit > validator_own_stakes` and `stake_limit < total_stakes`(validator's own stakes + guaranteed stakes).
    - Step 1: Cut `2 GB` storage volume
    ```shell
    curl --location --request POST 'http://127.0.0.1:12222/api/v0/srd/change' --header 'backup: {"address":"5EkFb4p7R4qnGTTYbsi7mQQzL1e7D13RQwBMm49HkN6bvzjt","encoded":"0x4800d1de3925a9b792ae2497a5ed109af5eb6d8b8d46936ccee405dd661c7a5ef96c7eb263cf3bf71bd6667a2e942e4e1c78b0bee8a325da3512880882299318483deeec128acb4a0f4fc9a12638817546356017aded813a6c52a689635d7a9d420cb7c5f60ade3d0d2f4bd0f370377069d5799161b586f32e9508b5ac9d4561002b66fcbb73f3bbf6a8c006e9e9f13a726ce278221e6ecdb04c288808","encoding":{"content":["pkcs8","sr25519"],"type":"xsalsa20-poly1305","version":"2"},"meta":{"genesisHash":"0xa5bec4b73f15b4f6e99eee42778ab6754c90aeadcd2ae86aa79e9c5c7a55dd30","name":"w3f_V_controller","tags":[],"whenCreated":1596525471197}}' --header 'Content-Type: application/json' --data-raw '{"change":-2}'
    ```
    - Step 2: **After 1 era**, you will see *Guarantor's Stake* reduced from `staker` API
    ![passive_cut_g_stake](m1_img/6-1.png)
  - Case2: `stake_limit < validator_bonded_stakes`.
    - Step1: Continue to cut `5 GB` storage volume
    ```shell
    curl --location --request POST 'http://127.0.0.1:12222/api/v0/srd/change' --header 'backup: {"address":"5EkFb4p7R4qnGTTYbsi7mQQzL1e7D13RQwBMm49HkN6bvzjt","encoded":"0x4800d1de3925a9b792ae2497a5ed109af5eb6d8b8d46936ccee405dd661c7a5ef96c7eb263cf3bf71bd6667a2e942e4e1c78b0bee8a325da3512880882299318483deeec128acb4a0f4fc9a12638817546356017aded813a6c52a689635d7a9d420cb7c5f60ade3d0d2f4bd0f370377069d5799161b586f32e9508b5ac9d4561002b66fcbb73f3bbf6a8c006e9e9f13a726ce278221e6ecdb04c288808","encoding":{"content":["pkcs8","sr25519"],"type":"xsalsa20-poly1305","version":"2"},"meta":{"genesisHash":"0xa5bec4b73f15b4f6e99eee42778ab6754c90aeadcd2ae86aa79e9c5c7a55dd30","name":"w3f_V_controller","tags":[],"whenCreated":1596525471197}}' --header 'Content-Type: application/json' --data-raw '{"change":-5}'
    ```
    - Step2: **After 1 era**, you will see the *Guarantor* already been removed from `staker` API.
    ![passive_cut_all](m1_img/6-2.jpg)

#### 7. Validator election algorithm

Validator Set will elect every era, you can check from Staking page in [Crust Apps](http://apps.crust.network/#/staking), they are ranking top down by their `total stake`.
![election](m1_img/7.png)

#### 8. Providing storage interface to store meaningful file

> ***IMPORTANT NOTES***: **Please prepare another machine under the same LAN**,This step of the test is to **simulate the client sending a file to the server**, and confirmed by the server node, and finally the meaningful file infomation can be queried from blockchain through [Crust Apps](http://apps.crust.network). And please use your **guarantors account** to preparing environment.

##### 8.1 Install FastDFS client and Karst client

- Prepare folder
  ```shell
  sudo mkdir -p /opt/fastdfs
  ```
  ```shell
  cd /opt/fastdfs
  ```
- Install `libfastcommon`
  - Step 1: Download
  ```shell
  sudo wget https://github.com/happyfish100/libfastcommon/archive/V1.0.43.tar.gz
  ```
  - Step 2: Unzip
  ```shell
  sudo tar -zxvf V1.0.43.tar.gz
  ```
  - Step 3: Compile and Install
  ```shell
  cd libfastcommon-1.0.43
  ```
  ```shell
  sudo ./make.sh
  ```
  ```shell
  sudo ./make.sh install
  ```
  Success if you get the info shows below:
  ![install_libfcommon](m1_img/8-1.jpg)
  - Step 4: Set symbol link
  ```shell
  sudo ln -s /usr/lib64/libfastcommon.so /usr/local/lib/libfastcommon.so
  sudo ln -s /usr/lib64/libfastcommon.so /usr/lib/libfastcommon.so
  sudo ln -s /usr/lib64/libfdfsclient.so /usr/local/lib/libfdfsclient.so
  sudo ln -s /usr/lib64/libfdfsclient.so /usr/lib/libfdfsclient.so
  ```
- Install `fastdfs`
  - Step 1: Download
  ```shell
  cd /opt/fastdfs
  ```
  ```shell
  sudo wget https://github.com/happyfish100/fastdfs/archive/V6.06.tar.gz
  ```
  - Step 2: Unzip
  ```shell
  sudo tar -zxvf V6.06.tar.gz
  ```
  - Step 3: Compile and Install
  ```shell
  cd fastdfs-6.06
  ```
  ```shell
  sudo ./make.sh
  ```
  ```shell
  sudo ./make.sh install
  ```
  Success if you get the info shows below:
  ![install_fdfs](m1_img/8-2.jpg)
  - Step 4: Config
  ```shell
  cd /etc/fdfs
  ```
  ```shell
  sudo mkdir -p /home/web3/fastdfs/test
  ```
  ```shell
  sudo cp storage.conf.sample storage.conf
  ```
  ```shell
  sudo vim storage.conf
  ```
  Change the `base_path` and `tracker_server` like the pic shows below, **Please change the `tracker_server`'s IP to your server IP**:
  ![fdfs_config](m1_img/8-3.png)
- Install `Karst`
  - Step 1: Install docker
  ```shell
  sudo docker pull crustio/karst:0.2.0
  ```
  - Step 2: Create folder
  ```shell
  mkdir -p /home/user/web3/kasrt
  ```
  - Step 3: Config
  ```shell
  cd /home/user/web3/kasrt
  ```
  ```shell
  vi config.json
  ```
  You need to edit your config file using the json below
  ```json
  {
    "base_url": "0.0.0.0:17000",
    "crust": {
      "address": "5FbxxwasgLPHJ3cEMcqJuohgrJ72E9dBwgw1Yw3VXbvEwK9u",
      "backup": "{\"address\":\"5FbxxwasgLPHJ3cEMcqJuohgrJ72E9dBwgw1Yw3VXbvEwK9u\",\"encoded\":\"0x8c7828311a3a87b339ec3841d923cfff32bb6f326339c052ced3cde7cfbb480321e7567e16d45035b6b86f7b85dd631312ddfa63bdc9b64e150da278e58847d2ad6b415f09f5654ba08b06761092273ddb5eb790d44e7ec3011275740f812ece858173bf9b590d217b58c8b05b95e391587807173b353f7d5ac764d0190b6b44202138ef96e81fbbe3060c0cc07c94739005894548548c230b4b7a686b\",\"encoding\":{\"content\":[\"pkcs8\",\"sr25519\"],\"type\":\"xsalsa20-poly1305\",\"version\":\"2\"},\"meta\":{\"name\":\"M1 Control\",\"tags\":[],\"whenCreated\":1589272669073}}",
      "base_url": "[Server IP Address]:56666/api/v1",
      "password": "123"
    },
    "fastdfs": {
      "max_conns": 100,
      "tracker_addrs": ["127.0.0.1:22122"]
    },
    "log_level": "debug",
    "tee_base_url": ""
  }
  ```
  Please change `[Server IP Address]` to your server's address and make sure `56666` is open.
  - Step 4: Run
  ```shell
  sudo docker run -it -v /home/user/:/karst -e INIT_ARGS="-c /karst/config.json" --name karst --network host crustio/karst:0.2.0
  ```

##### 8.2 Put file and place storage order

- Step 1: New `test.file`
  ```shell
  cd /home/user
  ```
  ```shell
  head -c 800000 /dev/urandom >> test.file
  ```
- Step 2: Split file
  ```shell
  sudo docker exec -it karst /bin/bash -c 'karst split /karst/test.file /karst'
  ```
- Step 3: Check the result and record the hash value
  ```shell
  "merkle_tree":"{\"hash\":\"32c5acdce8b26a2854388138bdb812f588fd783246dd00fbcdbf5fb1ecc3abd1\",\"size\":800000,\"links_num\":1,\"links\":[{\"hash\":\"5c9c53d767ff846d539d06f2d61318b1cd4e7b0ecfdc3e6ab02706e4d9fe8552\",\"size\":800000,\"links_num\":0,\"links\":[],\"stored_key\":\"\"}],\"stored_key\":\"\"}"
  ```
- Step 4: In the /home/user folder, you will see the splited folder
  ![splited_files](m1_img/8-4.jpg)
- Step 5: You can send the splited files to FastDFS
  ```shell
  fdfs_upload_file /etc/fdfs/client.conf /home/user/32c5acdce8b26a2854388138bdb812f588fd783246dd00fbcdbf5fb1ecc3abd1/0_5c9c53d767ff846d539d06f2d61318b1cd4e7b0ecfdc3e6ab02706e4d9fe8552
  ```
  and returns a path `group1/M00/00/36/wKgyB18qaJOAQ_wsAAw1ANBQ2Ww8836968`

- Step 6: Fill the `stored_key`(PATH value) with above *returned path*. Then declare the file to chain and request provider to generate store proof
  ```shell
  sudo docker exec -it karst /bin/bash -c 'karst declare "{\"hash\":\"32c5acdce8b26a2854388138bdb812f588fd783246dd00fbcdbf5fb1ecc3abd1\",\"size\":800000,\"links_num\":1,\"links\":[{\"hash\":\"5c9c53d767ff846d539d06f2d61318b1cd4e7b0ecfdc3e6ab02706e4d9fe8552\",\"size\":800000,\"links_num\":0,\"links\":[],\"stored_key\":\"group1/M00/00/36/wKgyB18qaJOAQ_wsAAw1ANBQ2Ww8836968\"}],\"stored_key\":\"\"}" 60 5EkFb4p7R4qnGTTYbsi7mQQzL1e7D13RQwBMm49HkN6bvzjt'
  ```
- Step 7: It will return a storage order id from chain
  ```shell
  [INFO] 2020/08/05 08:10:54 {"info":"Declare successfully in 4.281581829s ! Store order hash is '0x9fc854d7372a753a3d337986ae3e57b1613f36d4ba9285092f0928fb1425bd8a'.","store_order_hash":"0x9fc854d7372a753a3d337986ae3e57b1613f36d4ba9285092f0928fb1425bd8a","status":200}
  ```
- Step 8: **After 1 era**, you can check the work report which already contains the meaningful file with hash `32c5acdce8b26a2854388138bdb812f588fd783246dd00fbcdbf5fb1ecc3abd1`
  ![meaningful_file]()

##### 8.2 Get file

- Step 1: Get file stored info
  ```shell
  sudo docker exec -it karst /bin/bash -c 'karst obtain 32c5acdce8b26a2854388138bdb812f588fd783246dd00fbcdbf5fb1ecc3abd1 5EkFb4p7R4qnGTTYbsi7mQQzL1e7D13RQwBMm49HkN6bvzjt'
  ```
  It will return a FastDFS download path
  ```shell
  [INFO] 2020/08/05 08:14:00 {"info":"Obtain '32c5acdce8b26a2854388138bdb812f588fd783246dd00fbcdbf5fb1ecc3abd1' from '5EkFb4p7R4qnGTTYbsi7mQQzL1e7D13RQwBMm49HkN6bvzjt' successfully in 37.046923ms !","merkle_tree":"{\"hash\":\"32c5acdce8b26a2854388138bdb812f588fd783246dd00fbcdbf5fb1ecc3abd1\",\"size\":800000,\"links_num\":1,\"links\":[{\"hash\":\"5c9c53d767ff846d539d06f2d61318b1cd4e7b0ecfdc3e6ab02706e4d9fe8552\",\"size\":800000,\"links_num\":0,\"links\":[],\"stored_key\":\"group1/M00/00/36/wKgyB18qakiAQMm5AAw1ANBQ2Ww0592384\"}],\"stored_key\":\"\"}","status":200}
  ```
- Step 2: Copy the `stored_key`, download to local
  ```shell
  fdfs_download_file /etc/fdfs/client.conf group1/M00/00/36/wKgyB18qakiAQMm5AAw1ANBQ2Ww0592384
  ```