---
title: Plug (, Code) and Play solar, Ecoflow and Zendure
date: 2024-11-10T18:19:58+01:00
summary: Everything will eventually fit with anything else, if you press hard enough
project: SolarD
tags: ["solar","bash", "MQTT"]
draft: true

---

Two big players in the plug and play solar space are Ecoflow and Zendure. They both have fairly walled gardens and certainly will not talk to each other... or... couuuld they ?

## How impatience is a vertue (nope !)

People who know me most definitly praise me for my unbreakable calm and patience in the face of .... absolutly fucking nothing ! XD

I mean, I'm working on that, but when I want something, I usually want it now...

So... after ordering my solar panels (with their 3 weeks shipping) I didn't want to wait (another) 4 weeks to get my Zendure "Hyper 2000" (kudos on the naming guys !)...

So what did I do ? Weeeelll, big brain me got an ecoflow powertream to plug at least 2 of the panels !

I didn't want to shill for a shelly 3 EM though (eeeh ! Un Creusois, c'est qu'un Auvergnat qu'as roulé de sa montagne !) that plus the fact ecoflow and zendure system don't communicate, **none** of my solar equipement will be able to talk to one another, what could possibly go wrong ?

I could plug all my panels on the "Hyper 2000", but then, how would I justify whinning about walled garden ?! Huh ?! Guess you did not think of that !

I'll create a post for a deeper dive on both integration, but in short, I have to say, I was fairly surprise on how much communicating with Ecoflow's and Zendure's infrastructures was easy (at least to read data... ).

### Ecoflow integration

My grog brain did not succeed in configuring my powerstream using the api or mqtt server but certainly I am the only one to blame.

Oh, yes, you have both an API **and** an MQTT server ! Not necessarily a fan of MQTT (foreshadowing), but it's nice to have both !

At first, I used the api as it made more sense (read "was easier"), then I switch to mqtt when I integrated my "Hyper 2000" ... Anywoooo

Independently of your protocol of choice, you have to apply for a [dev account](https://developer.ecoflow.com) in order to get access, it is very simple and quick (took a couple days for me).

You'll be able to create a app key and private key that you'll use for you requests....

The only weird thing is the signing of said requests... instead of a standard token/api key/user-pass you have some signing shenanigans to authenticate your request, here is a quick sample of how it works in bash :

```bash
# guess what tool I used for the script creation ^^

## set default value for eg without parsearger magic
_arg_access_key="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
_arg_private_key="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
_arg_snNumber="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# get certificate for mqtt
_arg_endpoint="certification"

# get device data
_arg_endpoint="device/quota/all"

apiUrl="https://api.ecoflow.com/iot-open/sign/${_arg_endpoint}"
# generate nonce and timestamp
nonce="$((RANDOM % (999999 - 100000 + 1) + 100000))";
timestamp="$(date +"%s%3N")"
signStr="sn=${_arg_snNumber}&accessKey=${_arg_access_key}&nonce=${nonce}&timestamp=${timestamp}"

signature=$(echo -n "${signStr}" | openssl dgst -sha256 -hmac "${_arg_private_key}" -binary | od -An -v -tx1 | tr -d ' \n')

curl \
    -H "accessKey:${accessKey}" \
    -H "timestamp:${timestamp}" \
    -H "nonce:${nonce}" \
    -H "sign:${signature}" \
    "${apiUrl}?sn=${_arg_snNumber}" \
    -s -q;
```

The `device/quota/all` endpoint gives you a big fat and a bit cryptic json, but will have a look at it in the dedicated article

### Zendure integration

I am a bit annoyed (biased ? what bias, *uh uh!* , I don't even see what you're talking about !) at the fact that it is MQTT only...

That said, interfacing with it was a breeze ! Even as a first real interaction with MQTT !

There's only *one* downside : you can't configure your equipement outside of there dreadful phone only app...

Which, I mean, who would want to have control on a 1600€ piece of equipement one bought ? People nowadays...how would this company do otherwise... uh ?! ...

That said, (spoiler alert) some white spirited hackery can clean this stain on an otherwise interessting appliance !

Just like Ecoflow, you have a simple api call to make in order to get you mqtt credentials, but no other account to create (just the app one) :

```bash
## set default value for eg without parsearger magic
_arg_account="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
_arg_snNumber="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
# US account
_arg_eu="off"
# EU account
_arg_eu="on"

apiUrl="https://app.zendure.tech";
applyEndpoint="/developer/api/apply";

if [ "$_arg_eu" = "on" ]; then
    apiUrl+="/eu";
fi

curl -sS \
    --json "{'snNumber': '${_arg_snNumber}', 'account': '${_arg_account}'}" \
    "${apiUrl}${applyEndpoint}"
```

## SolarD

SO ? Where am I goin' with that ?

In a crazy and never seen before plot twist, I created a small tool to simplify interfacing all of that together :D

And you'll never guess what ?! It's in bash, and the most crazy part of all (like, I really don't know how it got to my brain...) it uses ParseArger ! *crowd scream in delirium, fireworks in the background*...

...

...

Yeah, yeah, I know, I might need to renew myself XD.

What can `SolarD` do ? it simplifies interaction with both Zendure ("Hyper 2000") and ecoflow (Powerstream) API/MQTT servers either to gather informations or to set devices configuration.

It might (most probably not !) support other of zendure and ecoflow equipement, but I have none.... so you either have to add (or confirm) support yourself, *Ooooorrr* you could gift me said equipement so I'd have to add support... *just sayin'*

As for other equipement manufacturer ? *your Highness should hear the meager sound coming from my purse*, so above statement also apply ;)

Though not directly related to solar, support for shelly "plus 1" and "plug S" is coming (yeeeaaah, more diversity in my equipements' manufacturers \o/).

I wanted to keep thing simple, so no DB, no history, no BS ! Flat files only, if it's good enough for unix, it's good enough for me !!

Everything is stored in your .config and if you need to add a (Time)DB or to trigger a script you could watch for file change using you favorite tool.

Once you `SolarD add <zendure|ecoflow> <snNumber> ...` one or more equipements, you will be able to `SolarD start` MQTT subscriptions and bath in that sweet stream of photovoltaic production related data !

Here comes the usual TLDR and usage section ;)

### TLDR

```bash
curl -s https://raw.githubusercontent.com/DimitriGilbert/SolarD/main/utils/get_SolarD -O;
# make it executable
chmod +x get_SolarD;
# generic install
./get_SolarD --install;
# reload aliases
source ~/.bashrc;
# add equipepement
SolarD add <ecoflow|zendure> <snNumber> [manufacturer specific options, --help for detail]
# start all MQTT sub
SolarD start
# see what sensors/data you have access to in your different equipements
tree $HOME/.config/SolarD/equipement/
```

### Usage

If you want detailed usage you shoud check the [full documentation](https://github.com/DimitriGilbert/SolarD/blob/main/documentation.md) but here is the detail for the most useful commands

#### SolarD add : add an equipement

This command will perform all the necessary step for you to be able to start the mqtt subscriptions, why'd you call that lazyness ?

```bash
# generic
SolarD add <vendor> <sn-number> [--access-key <value>] [--private-key <value>] [--account <value>] [--[no-]eu]

# ecoflow
SolarD add ecoflow <sn-number> [--access-key <value from your dev account>] [--private-key <value from your dev account>]

# zendure
SolarD add <vendor> <sn-number> [--account <zendure app email/user>] [--[no-]eu]
```

#### SolarD ecoflow get-all-quota : get all data for an Ecoflow equipement

It uses the API, no MQTT involved ! you can even format the output using yq format option value

```bash
SolarD ecoflow get-all-quotas <snNumber> [--quota <name of the data you want>] [--format <json|yaml|props|csv|xml|toml|shell|lua>]
```
#### SolarD mqtt-sub : start mqtt clients

What you want me to say... I don't like MQTT...

Does it work ? ... yes...

Would I rather have an API ? YES !

I know it has its advantages but... I'm an old man yelling at clouds and I DONT LIKE IT !

```bash
SolarD [ecoflow|zendure] mqtt-sub [<snNumber>]
```

### Example

To be honest, I don't know why and how you'd use that data, on my side, I use it to show that data on my desktop, using a KDE plama widget thingy that display the output of this (do not judge) "script"

```bash
#!/bin/bash
HyperSN=
PwrStrmSN=

get_e_sensor() {
    cat "$HOME/.config/SolarD/equipement/ecoflow/$PwrStrmSN/sensors/$1"
}

get_z_sensor() {
    cat "$HOME/.config/SolarD/equipement/zendure/$HyperSN/sensors/$1"
}

divide_by() {
    dvdb=${2:-10}
    dvdScl=${3:-1}
    echo "scale=$dvdScl; $1 / $dvdb" | bc;
}

packpower="";
homepower="$(get_z_sensor "outputHomePower")W";
remainChT="";
if [ "$(get_z_sensor "packState")" == "1" ]; then
    packpower="(+$(get_z_sensor "outputPackPower")W)";
    # calculate remaining charging time
    remainChT="charged in $(echo "scale=2; ((($(get_z_sensor "socSet")/1000) - 0.$(get_z_sensor "electricLevel"))*1920)/$(get_z_sensor "outputPackPower")" | bc | awk '{h=int($1); m=int(($1-h)*60); print h":"m""}')";
    homepower="$(get_z_sensor "outputPackPower")W";
    if [ "$(get_z_sensor "gridInputPower")" != "0" ]; then
        homepower="-$(get_z_sensor "gridInputPower") / $homepower";
    elif [ "$(get_z_sensor "outputHomePower")" != "0" ]; then
        homepower="$(get_z_sensor "outputHomePower") / $homepower";
    fi
elif [ "$(get_z_sensor "packState")" == "2" ];then
    remainChT="discharged in ""$(echo "scale=2; ((0.$(get_z_sensor "electricLevel") - ($(get_z_sensor "minSoc")/1000))*1920)/$(get_z_sensor "packInputPower")" | bc | awk '{h=int($1); m=int(($1-h)*60); print h":"m""}')";
    packpower="(-$(get_z_sensor "packInputPower")W)";
fi

output="\tStream ($(divide_by "$(get_e_sensor invOutputWatts)" 10 1)W)\tHyper ($(get_z_sensor "solarInputPower")W)\n"
output+="\t$(divide_by "$(get_e_sensor llcTemp)" 10 0)°C\t\t\t$(get_z_sensor "electricLevel")% ${packpower}\n\t\t\t\t$remainChT\n"
output+="output\t$(divide_by "$(get_e_sensor invOutputWatts)" 10 1)W\t\t\t${homepower}\n"
output+="pv1\t$(divide_by "$(get_e_sensor pv1InputWatts)" 10 1)W @ $(divide_by "$(get_e_sensor pv1Temp)" 10 0)°C\t\t$(get_z_sensor "solarPower1")W\n"
output+="\t$(divide_by "$(get_e_sensor pv1InputVolt)" 10 1)V $(divide_by "$(get_e_sensor pv1InputCur)" 10 1)A\n"
output+="pv2\t$(divide_by "$(get_e_sensor pv2InputWatts)" 10 1)W @ $(divide_by "$(get_e_sensor pv2Temp)" 10 0)°C\t\t$(get_z_sensor "solarPower2")W\n"
output+="\t$(divide_by "$(get_e_sensor pv2InputVolt)" 10 1)V $(divide_by "$(get_e_sensor pv2InputCur)" 10 1)A\n"

echo -e "$output"

```

I also have a script to charge the "Hyper 2000" battery with the "excess" power from the Powerstream
```bash
#!/bin/bash

_SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)";
# Base directory for all equipment data
BASE_DIR="$HOME/.config/SolarD/equipement"
BAT_EQP=""
MIN_CHARGE=30
MAX_CHARGE=1000
bfrMin=3
bfrMax=30
get_z_sensor() {
    # Get the current Z sensor value
    cat "$BASE_DIR/zendure/$BAT_EQP/sensors/$1"
}

# nothing
loadHomeMin=90
# plus computer
# loadHomeMin=130
# plus computer
# loadHomeMin=140
# plus fridge
# loadHomeMin=160
# plus freezer
# loadHomeMin=190
# plus waching machine after heating
# loadHomeMin=340
# plus dish washer after heating
# loadHomeMin=280
stayInChargeBuffer=30
currentOutput=$(printf "%.0f" "$(cat "$BASE_DIR/ecoflow/totalOutput")")
shouldLimitAt=$(($currentOutput - $loadHomeMin))
currentGridLimit=$(cat "$BASE_DIR/zendure/$BAT_EQP/setLimit")

# or is it packState ?
# if [ "$(get_z_sensor "chargingMode")" = "2" ] && [ "$(get_z_sensor "packState")" = "1" ]; then
if [ "$(get_z_sensor "packState")" = "1" ]; then
    # check if in correct acMode
    if [ "$(get_z_sensor acMode)" != "1" ];then
        echo "mode : $(get_z_sensor acMode)"
        # if we are not using power from the battery, switch to charging from grid
        if [ "$(get_z_sensor packInputPower)" = "0" ];then
            "$_SCRIPT_DIR/../SolarD" zendure mqtt-pub "$BAT_EQP" acMode 1
            echo "acMode 1"
            # wait for switch to take action
            sleep 5
        else
            # using power from battery so we cannot charge from grid
            exit 0
        fi
    fi
    if [ "$shouldLimitAt" -le "0" ];then
        if [ "$shouldLimitAt" -lt "-$stayInChargeBuffer" ];then
            echo "0" > "$BASE_DIR/zendure/$BAT_EQP/setLimit"
            # just producing enough
            "$_SCRIPT_DIR/../SolarD" zendure mqtt-pub "$BAT_EQP" inputLimit 0
            echo "inputLimit 0"
        elif [ "$currentGridLimit" -gt "30" ];then
            echo "30" > "$BASE_DIR/zendure/$BAT_EQP/setLimit"
            # stay charging cause switching take too much time
            "$_SCRIPT_DIR/../SolarD" zendure mqtt-pub "$BAT_EQP" inputLimit $MIN_CHARGE
            echo "inputLimit 30"
        fi
    elif [ "$shouldLimitAt" != "$currentGridLimit" ];then
        if [ "$shouldLimitAt" -lt "$MIN_CHARGE" ];then
            shouldLimitAt=$MIN_CHARGE
        fi
        if [ "$shouldLimitAt" -gt "$MAX_CHARGE" ];then
            shouldLimitAt=$MAX_CHARGE
        fi

        chgBfr=$((stayInChargeBuffer - ($(date +%s) - $(stat -c %Y "$BASE_DIR/zendure/$BAT_EQP/setLimit"))));
        chgBfr=${chgBfr#-}
        if [ "$chgBfr" -lt "$bfrMin" ]; then
            chgBfr=$bfrMin
            echo "$currentGridLimit" > "$BASE_DIR/zendure/$BAT_EQP/setLimit"
        fi
        if [ "$chgBfr" -gt "$bfrMax" ]; then
            chgBfr=$bfrMax
            echo "$currentGridLimit" > "$BASE_DIR/zendure/$BAT_EQP/setLimit"
        fi
        change_min=$((currentGridLimit-chgBfr))
        charge_max=$((currentGridLimit+chgBfr))
        echo -e "current limit:${currentGridLimit}W (+/-$chgBfr)\n??:$change_min < $shouldLimitAt < $charge_max\n"

        # if [ "$shouldLimitAt" -gt "$charge_max" ] || [ "$shouldLimitAt" -lt "$change_min" ] || [ "$shouldLimitAt" -lt "$charge_max" ] || [ "$shouldLimitAt" -gt "$change_min" ];then
        if [ "$shouldLimitAt" -gt "$charge_max" ] || [ "$shouldLimitAt" -lt "$change_min" ];then
            echo "$shouldLimitAt" > "$BASE_DIR/zendure/$BAT_EQP/setLimit"
            "$_SCRIPT_DIR/../SolarD" zendure mqtt-pub "$BAT_EQP" inputLimit "$shouldLimitAt"
            echo "updating inputLimit:${shouldLimitAt}W"
        fi
    fi
# elif [ "$(get_z_sensor "packState")" != "1" ]; then
else
    if [ "$(get_z_sensor acMode)" != "2" ];then
        "$_SCRIPT_DIR/../SolarD" zendure mqtt-pub "$BAT_EQP" acMode 2
    fi
    echo "done charging..."
fi

```

I use `watch -n 6 ./my_script` to check the data every 6 seconds (which is enough) and adjust charging accordingly.

{{% projectInteraction project="SolarD" %}}

{{% goodbye %}}
