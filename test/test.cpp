#include <bits/stdc++.h>
using namespace std;

int main() {
	int t;
	cin>>t;
	while(t--){
	    int x,y;
	    cin>>x>>y;
	    int z = (y-x)*10;
	    int i = 100-y;
	    int hour = z/i;
	    if(hour == 0) cout<<1<<endl;
	    else{
	        if(z%i == 0) cout<<hour<<endl;
	        else cout<<hour+1<<endl;
	    }
	}

}
