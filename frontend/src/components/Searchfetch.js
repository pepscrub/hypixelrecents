import M from 'materialize-css'
import AdSense from 'react-adsense';
import React, {useState, useEffect} from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function stringFormat(string)
{
    if(string === undefined) return string
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
function Searchfetch()
{
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    const [noData, setNoData] = useState(null);
    const [chips, setChips] = useState(0);

    const port = window.location.hostname === 'localhost' ? ':8080' : '';
    const baseurl = `${window.location.protocol}//${window.location.hostname}${port}/api/v1/`
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        async function fetchData()
        {
            const rawdata = await fetch(`${baseurl}searches`)
            .then(res =>
                {
                    if(!res.ok) return {"error": "Too many requests"}
                    return res.json();
                })
            .then((result) => {
                if(result['error']) return setError('Cannot connect to DB')
                setIsLoaded(true);
                return result;
            },
            (error) => {
                console.table(error)
                setIsLoaded(true);
                setError(error.message);
            })

            fetch(`${baseurl}reaction`).then(res=>res.json()).then(res=>{setNoData(res)});
            

            const elems = document.querySelectorAll('.chips');
            M.Chips.init(elems, {
                placeholder: "Name / UUID",
                secondaryPlaceholder: "+ 1 more",
                autocompleteOptions: {
                    data: rawdata,
                    limit: 5,
                    minLength: 1
                },
                onChipSelect: async (e, chip) =>
                {
                    const chips = document.querySelectorAll('.chip')
                    chips.forEach(chip=>chip.style = '')
                    chip.style = 'background-color: #4f4f5c'
                },
                onChipAdd: async (e, chip)=>
                {
                    chip.style = ''
                    const chips = document.querySelectorAll('.chip').length;
                    const node = document.querySelectorAll('.chip')[chips-1];

                    if(chips >= 2)
                    {
                        e[0].querySelector('input').setAttribute('disabled', '');
                        e[0].querySelector('input').setAttribute('style', 'height: 0;width: 0;display: flex;');
                    }
                    if(chips >= 3) return node.remove();

                    const text = chip.innerText.split('\n')[0];
                    const data = rawdata[text] !== undefined ? rawdata[text] : 
                    await fetch(`${window.location.protocol}//${window.location.hostname}${port}/api/v1/head/${text}`)
                    .then(res=>res.json())
                    .then(res=>
                    {
                        if(res['error']) return res;
                        const b64encoded = btoa(String.fromCharCode.apply(null, res['blob']['data']));
                        return "data:image/jpg;base64," + b64encoded
                    })

                    if(!data)
                    {
                        e[0].querySelector('input').removeAttribute('disabled', '');
                        e[0].querySelector('input').removeAttribute('style', '');
                        return node.remove();
                    }
                    if(data['error'])
                    {
                        e[0].querySelector('input').removeAttribute('disabled', '');
                        e[0].querySelector('input').removeAttribute('style', '');
                        window.M.toast({html: `This account does not exist`});
                        return node.remove();
                    }
                    const img = `<img src="${data}"/>`

                    node.classList.add('waves-effect');
                    node.classList.add('waves-light');
                    node.innerHTML += img;
                },
                onChipDelete: async (e, chip) =>
                {
                    const chips = document.querySelectorAll('.chip').length;

                    if(chips <= 2)
                    {
                        e[0].querySelector('input').removeAttribute('disabled', '');
                        e[0].querySelector('input').removeAttribute('style', '');
                    }
                }
            });
            const modal = document.querySelectorAll('.modal');
            M.Modal.init(modal, {});
            const collapsible = document.querySelectorAll('.collapsible');
            M.Collapsible.init(collapsible, {});
        }

        fetchData();

    }, [baseurl])

    const toggleState = () =>
    {
        setChips(document.querySelectorAll('.chip').length);
        setModalData(true);
        const chips = document.querySelectorAll('.chip')
        let query = ``
        // Get the user input
        chips.forEach(chip=>
        {
            const text = chip.innerText.split('\n')[0]
            query += `/${text}`
        })
        // Building url
        setModalLoading(true);
        const url = `${baseurl}player${query}`;
        fetch(url).then(res=>{
            if(res.ok) return res.json();
            M.toast({html: `HTTP ${res.status} ${res.statusText}`});
        }).then(res=>{
            setModalData(res)
            setModalLoading(false);
        }).catch(err=>
        {
            M.toast({html: `${err}`})
        })
    }

    const renderRes = () =>
    {
        if(modalLoading)
        {
            return(
                <ul className="collapsible" style={{border: 0,boxShadow: "none"}}>
                    <SkeletonTheme color="#202020" highlightColor="#444">
                        <Skeleton count={4} height={45}/>
                    </SkeletonTheme>
                </ul>
            )
        }else if(!modalData || !modalData[0])
        {
            return(
                <ul className="collapsible" style={{border: 0,boxShadow: "none"}}>
                    <h1 className="col s12 center">{ noData ? noData['face'] : '.-.'}</h1>
                    <p className="center">{ noData ? noData['reaction'] : 'huh'}</p>
                </ul>
            )
        }
        return(
            <ul className="collapsible">
                {
                    modalData.map((item, i)=>
                    {
                        // Rendering icon based on indexing
                        const icon = () =>
                        {
                            switch(i)
                            {
                                case 0:
                                return <span className="valign-wrapper"><i key={-1} className="material-icons">fiber_manual_record</i> Currently playing...</span>
                                case 1:
                                return <span><i key={-1} className="material-icons">king_bed</i> Bedwars</span>
                                case 2:
                                return <span><i key={-2} className="material-icons">smart_toy</i> Arcade</span>
                                case 3:
                                return <span><i key={-3} className="material-icons">feed</i> Other</span>
                                default:
                                return <i key={i}>{noData ? noData['face'] : '.-.'}</i>
                            }
                        }
                        return(
                            <li key={i.toString()}>
                                <div className="collapsible-header">
                                    {icon()}
                                    <span className="badge">{item.length}</span>
                                </div>
                                <div className="collapsible-body">
                                    {item.length === 0 ? 
                                    <span>
                                        <h1 className="col s12 center">{ noData ? noData['face'] : '.-.'}</h1>
                                        <p className="center">{ noData ? noData['reaction'] : 'huh'}</p>
                                    </span> : ''}
                                    {
                                        item.map((item, l)=>
                                        {
                                            const {
                                                date = Date.now(), 
                                                gameType = "oop Something happened", 
                                                mode = "oop Something happened", 
                                                map = "oop Something happened", 
                                                ended = Date.now()
                                            } = item;
                                            const type = gameType !== undefined ? stringFormat(gameType.replace('_', ' ')) : undefined;
                                            const title = item['active'] ? `${item['name']}` : (map ? map : type);
                                            // Date calculations
                                            const diff = (ended - date) / 1000;
                                            const dhrs = Math.floor((diff / 3600 ) % 24);
                                            const dmin = Math.floor((diff / 60 ) % 60);
                                            const dsec = Math.floor(diff % 60);
                                            // Date formating
                                            const duration = `${dhrs ? `${dhrs}hr${dhrs>1?'s':''}` : ''} 
                                            ${dmin ? `${dmin}min${dmin>1?'s':''}` : ''} 
                                            ${dsec ? `${dsec}sec${dsec>1?'s':''}` : ''}`

                                            // Bedwars modes fomatting
                                            const formattedmode = () =>
                                            {
                                                const formatting = item['active'] ? 
                                                (item['active']['mode'] ? item['active']['mode'] : (item['active']['online'] ? "Online" : "Offline")) : mode; 
                                                switch(formatting)
                                                {
                                                    case "Online": return "Online";
                                                    case "Offline": return "Offline";
                                                    case "EIGHT_ONE": return `1v1v1v1...`;
                                                    case "EIGHT_TWO": return `2v2v2v2...`;
                                                    case "FOUR_THREE": return `3v3v3v3`;
                                                    case "THREE_FOUR": return `4v4v4`;
                                                    case "FOUR_FOUR": return `4v4v4v4`;
                                                    case "LOBBY": return "Lobby";
                                                    case "PIT": return "Pit";
                                                    case "TWO_V_TWO": return "2v2";
                                                    case "CTF": return "Capture the Flag";
                                                    case "TDM": return "Team Death Match";
                                                    case "SOLO": return "Smash Heros";
                                                    case "DOM": return "Dominate";
                                                    case "PARTY": case null: return "";
                                                    case "solo_normal": return "Skywars Solo Normal";
                                                    case "ONE_V_JUAN": return "One v Juan";
                                                    case "solo_insane": return "Skywars Solo Insane";
                                                    default: return 'Well, how did i get here?';
                                                }
                                            }
                                            const fdate = new Date(date);
                                            const fend = new Date(ended);
                                            return (
                                                <div className="card">
                                                    <div className="card-image waves-effect waves-block waves-light">
                                                        {i === 1 && map ? <img alt={map} className="activator" src={`imgs/bedwars/${map.replace(' ','_')}.png`} /> : ''}
                                                    </div>
                                                    <div className="card-content">
                                                    <span className="card-title activator">
                                                        {title}
                                                        <i className="blue-text text-darken-1"> {formattedmode()} </i>
                                                        <i className="material-icons right">more_vert</i>
                                                    </span>
                                                    <p>{duration}</p>
                                                    </div>
                                                    <div className="card-reveal">
                                                    <span className="card-title"><i className="material-icons right waves-effect waves-red">close</i></span>
                                                    {
                                                        i === 0 ? 
                                                        <span>
                                                            <p>{item['active'] ? stringFormat(item['active']['gameType']) : item['active']} {formattedmode()}</p>
                                                        </span>: <span>
                                                            <div>

                                                            </div>
                                                            <table className="responsive-table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>{title}</th>
                                                                        <th>Time</th>
                                                                        <th>Date</th>
                                                                    </tr>
                                                                </thead>

                                                                <tbody>
                                                                    <tr>
                                                                        <td>Game Started</td>
                                                                        <td>{fdate.toLocaleTimeString()}</td>
                                                                        <td>{fdate.toLocaleDateString()}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Game Ended</td>
                                                                        <td>{fend.toLocaleTimeString()}</td>
                                                                        <td>{fend.toLocaleDateString()}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Duration</td>
                                                                        <td>{duration}</td>
                                                                        <td></td>
                                                                    </tr>
                                                                </tbody>

                                                            </table>
                                                        </span>
                                                    }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </li>
                        )
                    })
                }
                <AdSense.Google
                    client="ca-pub-5211251535508566"
                    slot="7528515664"
                    style={{ display: 'block' }}
                    layout='in-article'
                    format='auto'
                    responsive='true'
                />
            </ul>
        )
    }

    if(error)
    {
        return <div className="center">
            <h1 className="teal-text text-accent-3">(´−｀)ﾝ</h1>
            <h4 className="grey-text text-darken-1">I don't really know what happened...</h4>
            <p>Error: <span className="red-text text-accent-2">{error}</span></p>
        </div>;
    }
    if (!isLoaded) return (
        <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton count={2} height={45}/>
        </SkeletonTheme>
    )
    return (
        <div className="row">
            <div className="chips chips-autocomplete col s12"></div>
            <a onClick={toggleState} className="waves-effect waves-light btn col s12 modal-trigger" href="#main-modal">Search</a>
            <div id="main-modal" className="modal bottom-sheet">
                <div className="modal-content container">
                <a href="#!" className="modal-close waves-effect waves-red btn-flat right">
                    <span className="material-icons">close</span>
                </a>
                <h4>Games on Hypixel {chips > 1 ? 'Together' : ''}</h4>
                {renderRes()}
                </div>
            </div>
        </div>
    )
}

export default Searchfetch;