#include <bits/stdc++.h>
using namespace std;

int main() {
	int t;
	cin >> t;
	while(t--){
	    int x, y;
	    cin >> x >> y;
	    
	    double h = (10.0 * (x-y))/(y-100);
	    int hours = ceil(h);
	    
	    cout << hours << endl;
	}
    return 0;
}