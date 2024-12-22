class MusicPlayer
{
    constructor(MusicList)
    {
        this.MusicList=MusicList;
        this.index=0;
    }

    getMusic()
    {
       return this.MusicList[this.index];
    }

    next()
    {
        if(this.index+1<this.MusicList.length)
            this.index++;
        else
            this.index=0;
    }

    prev()
    {
        if(this.index!=0)
            this.index--;
        else
            this.index=this.MusicList.length-1;
    }
}